'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const locales = ['american-to-british', 'british-to-american']
      const { text, locale } = req.body;
      let translation;

      if((text === undefined) || (locale === undefined)){
        return res.json({ error: 'Required field(s) missing' })
      }
      if(text == ''){
        return res.json({ error: 'No text to translate' })
      }
      if(!locales.includes(locale)){
        return res.json({ error: 'Invalid value for locale field' })
      }

      if (locale === 'british-to-american'){
        translation = translator.britishToAmerican(text);
      } 
      if (locale === 'american-to-british'){
        translation = translator.americanToBritish(text);
      }

      if(text === translation){
        translation = "Everything looks good to me!";
      }

      return res.json({
        text,
        translation
      })

    });
};
