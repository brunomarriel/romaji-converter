const textarea = document.getElementById('input-text');
const romanizationOutput = document.getElementById('romanization-output');
const translationOutput = document.getElementById('translation-output');

textarea.addEventListener('input', async () => {
  const text = textarea.value;
  const translation = await translateText(text);
  const romanization = await romanizeText(text);

  romanizationOutput.value = romanization;
  translationOutput.value = translation;
});

async function translateText(text) {
  const yandexTranslate = require('yandex-translate');
  const translate = yandexTranslate('trnsl.1.1.20220331T160703Z.8e8e5f8e8e8e8e8e.3d6d6d6d6d6d6d6d34343434343434347f7f7f7f');
  const result = await translate.translate(text, 'ja', 'en');

  return result.text[0];
}

async function romanizeText(text) {
  const mecab = require('mecab-js');
  const mecabNode = mecab.node();
  mecabNode.parse(text, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }

    const romanizedText = result.split('\n').filter(line => line.startsWith('EOS')).map(line => line.split('\t')[7]).join('');

    return romanizedText;
  });
}
