import { keyboards } from './keyboards';

/**
 * Score keyboards against user answers.
 * Each answer contributes tags (e.g., { size: '75%', switch: 'linear' }).
 * A keyboard matches a tag if its array for that dimension includes the answer's value.
 * "either" values skip that dimension (no filtering).
 *
 * Returns keyboards sorted by number of matching dimensions, descending.
 */
export function scoreKeyboards(answers) {
  // Build the filter criteria from answers, skipping "either" values
  const criteria = {};
  for (const answer of answers) {
    for (const [dimension, value] of Object.entries(answer.tags)) {
      if (value !== 'either') {
        criteria[dimension] = value;
      }
    }
  }

  const dimensions = Object.keys(criteria);

  if (dimensions.length === 0) {
    // No criteria — return top keyboards by some default ordering
    return keyboards.slice(0, 3).map((k) => ({ ...k, score: 0, matchedOn: [], maxScore: 0 }));
  }

  const scored = keyboards.map((kb) => {
    let score = 0;
    const matchedOn = [];

    for (const [dim, value] of Object.entries(criteria)) {
      if (kb.tags[dim] && kb.tags[dim].includes(value)) {
        score++;
        matchedOn.push(dim);
      }
    }

    return { ...kb, score, matchedOn, maxScore: dimensions.length };
  });

  // Sort by score descending, then by price ascending as tie-breaker
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    // Crude price comparison — extract number from price string
    const priceA = parseInt(a.price.replace(/[^0-9]/g, ''), 10);
    const priceB = parseInt(b.price.replace(/[^0-9]/g, ''), 10);
    return priceA - priceB;
  });

  return scored;
}

/**
 * Get dimension label for display
 */
export function dimensionLabel(dim) {
  const labels = {
    size: 'size',
    switch: 'switch preference',
    budget: 'budget',
    use: 'use case',
    connectivity: 'connectivity',
    build: 'build type',
  };
  return labels[dim] || dim;
}
