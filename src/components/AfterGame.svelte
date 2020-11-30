<script>
  import { playerInfo, activeLocale } from "../store";

  import LangSelector from "./Config/LangSelector.svelte";

  let playerName = "";
  let playerEmail = "";
  let infoSubmitted = false;

  let allTexts = {
    nederlands: {
      alinea1: "Bedankt voor het mee doen aan de test!",
      alinea2: "Voer hieronder je naam en emailadres in om de vragenlijst te ontvangen.",
    },
    english: {
      alinea1: "Thanks for taking the test!",
      alinea2: "Enter your name and email address below to receive the questionnaire.",
    },
  };

  function submitInformation() {
    let info = {
      name: playerName,
      email: playerEmail,
    };
    playerInfo.set(info);
    infoSubmitted = true;
  }
  
</script>

<div class="after-game">
  <LangSelector />

  {#if !infoSubmitted}
    <p>{allTexts[$activeLocale].alinea1}</p>
    <p>{allTexts[$activeLocale].alinea2}</p>

    <input placeholder="Name" type="text" name="name" bind:value={playerName} />
    <input placeholder="Email" type="text" name="email" bind:value={playerEmail} />

    <button class="btn" on:click={submitInformation}> <img src="./icons/check.png" alt="" /> </button>
  {:else}
    <div>Thanks!</div>
  {/if}
</div>
