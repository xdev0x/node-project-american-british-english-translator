# American British Translator

This is the boilerplate for the American British Translator project. Instructions for building your project can be found at https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/american-british-translator

You can POST to /api/translate with a body containing text with the text to translate and locale with either american-to-british or british-to-american. The returned object should contain the submitted text and translation with the translated text.

Waiting:The /api/translate route should handle the way time is written in American and British English. For example, ten thirty is written as "10.30" in British English and "10:30" in American English. The span element should wrap the entire time string, i.e. <span class="highlight">10:30</span>.

Waiting:The /api/translate route should also handle the way titles/honorifics are abbreviated in American and British English. For example, Doctor Wright is abbreviated as "Dr Wright" in British English and "Dr. Wright" in American English. See /components/american-to-british-titles.js for the different titles your application should handle.

Waiting:Wrap any translated spelling or terms with <span class="highlight">...</span> tags so they appear in green.

Waiting:If one or more of the required fields is missing, return { error: 'Required field(s) missing' }.

Waiting:If text is empty, return { error: 'No text to translate' }

Waiting:If locale does not match one of the two specified locales, return { error: 'Invalid value for locale field' }.

Waiting:If text requires no translation, return "Everything looks good to me!" for the translation value.

Waiting:All 24 unit tests are complete and passing. See /tests/1_unit-tests.js for the expected behavior you should write tests for.

Waiting:All 6 functional tests are complete and passing. See /tests/2_functional-tests.js for the functionality you should write tests for.
