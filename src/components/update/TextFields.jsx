// Component for the TextFields

export default function TextFields({ title, setTitle, body, setBody, words, setWords, values }) {

  // Basic structuring for the display for words in textarea

  const wordsDisplay = 'Words: ' + words + '/' + '4000';
  const warning = "Maximum word count reached";

  const updateTitle = (value) => {
    setTitle(value);
  }

  const updateWords = (newText) => {

    // Case for if words are already 4000

    if (words === 4000 && newText.length > body.length && newText.endsWith(' ')) {
      return;
    }

    // The regex is making sure 2 white spaces dont get considered as a word

    const filteredWords = newText.split(/\s+/).filter((word) => word.trim() !== '');

    // Case for setting the new inputs

    if (filteredWords.length <= 4000) {
      setBody(newText);
      setWords(filteredWords.length);
    }
  }
  return (
    <section className="flex flex-col gap-4">
      <input value={`${title}`} className="p-2 text-black bg-slate-200 rounded-[5px]" onChange={(e) => updateTitle(e.target.value)}></input>
      <textarea value={`${body}`} rows={5} onChange={(e) => updateWords(e.target.value)} className="text-black bg-slate-200 p-2 h-full rounded-[5px] resize-none"></textarea>
      <div className="flex flex-row gap-4">
        <div>{wordsDisplay}</div>
        <div className={`${words === 4000 ? 'display-inline-block' : 'hidden'} text-red-500`}>
          {warning}
        </div>
      </div>
    </section>
  )
}