/**
 * @fileoverview Collection of internal functions for writing JS components
 * @module CasperUtilityModules.js
 *
 * @author Casper Coders
 *
 */


export const attemptQuery = (selector, context = document, queryType = `querySelector`) => {
  // TODO: Accept an array or DOM String
  try {
    return context[queryType](selector);
  } catch(e) {
    throw new Error(`Attempt to query the DOM was unsuccessful using \`${selector}\` selector in the context of  \`${context}\` with the \`${queryType}\` method invoked. The exact error message of this attempt was the following: ${e.message}`);
  }
};

export const attemptMandatoryQuery = (selector, context = document, queryType = `querySelector`) => {
  let result;

  try {
    result = attemptQuery(selector, context, queryType);
  } catch(e) {
    throw new Error(`Could not invoke a query without failure: ${e.message}`);
  }

  // Should be at least an element of a value
  if (Object.is(result, null) || Object.is(result, undefined) || Object.is(result, [])) {
    throw new Error(`Selector passed in did not reference an element on the page at the point this script was ran or queryable to be able to continiue execution of the rest of this code. Evaluate the selector and the context this function was ran in order for the intended effect of this script be realized.`);
  }
  return result;
};
