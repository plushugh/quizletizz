<script>
  import * as XLSX from "xlsx";
  import { getDefMCQ, getTermMCQ } from "./lib/conversion";

  let input,
    output = "";

  const setDefMCQ = () => {
    output = getDefMCQ(input);
  };
  const setTermMCQ = () => {
    output = getTermMCQ(input);
  };
</script>

<svelte:head>
  <link rel="stylesheet" href="/water.css" />
</svelte:head>

<main>
  <h1>Quizlet to Quizizz converter</h1>
  <small
    >Open Sourced by <a href="https://github.com/plushugh">Hugh He</a> on
    <a href="https://github.com/plushugh/quizletizz">Github</a></small
  >
  <section>
    <textarea bind:value={input} placeholder="在这里粘贴quizlet导出" />
    <textarea bind:value={output} readonly placeholder="输出区域，可以忽略" />
  </section>
  <section>
    <button on:click={setDefMCQ}>单选：选项是定义</button>
    <button on:click={setTermMCQ}>单选：选项是单词</button>
  </section>
  <section>
    <button
      href={"data:text/plain;charset=utf-8," + encodeURIComponent(output)}
      download="importable.csv"
      disabled={!output}>下载csv</button
    >
    <button
      disabled={!output}
      on:click={() => {
        const wb = XLSX.read(output, { type: "string" });

        XLSX.writeFile(wb, "importable.xlsx");
      }}>可以直接quizizz导入的：下载xlsx</button
    >
  </section>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    text-align: center;
    max-width: 75ch;
    padding: 12px;
    margin: 0 auto;
  }
  main h1 {
    margin-top: 3rem;
    margin-bottom: 0.75rem;
  }
  main small {
    display: block;
    font-size: 0.8rem;
    margin-bottom: 2rem;
  }
  main section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  main section:first-of-type button {
    margin-right: 0;
  }

  @media (max-width: 600px) {
    main section {
      grid-template-columns: 1fr;
    }
  }
  main section textarea {
    font-family: Consolas, Menlo, monospace;
    resize: vertical;
  }
</style>
