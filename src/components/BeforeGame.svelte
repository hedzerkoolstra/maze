<script>
  import { appState, activeLocale } from "../store";

  import LangSelector from "./Config/LangSelector.svelte";
  
  let allTexts = {
    nederlands: {
      alinea1:
        "Zometeen zie je een raster met vakjes. Wanneer je op één van de vakjes klikt, verandert deze in een gekleurd of een zwart vakje. Het doel is om zoveel mogelijk gekleurde vakjes te vinden.",
      alinea2:
        "Zodra je op start drukt heb je 30 seconden de tijd. Na een ronde kan je het  raster resetten en een nieuwe ronde starten tot dat wordt aangegeven dat het spel afgelopen is.",
    },
    english: {
        alinea1: 'In a moment you will see a grid with squares. When you click on one of the boxes, it changes to a colored or a black box. The goal is to find as many colored squares as possible.',
        alinea2: 'As soon as you press start you have 30 seconds. After a round you can reset the grid and start a new round until you get notified that the game is over.',
    }
  };

  function goToGame() {
    appState.update((n) => n + 1);
  }
  
</script>

<section>
    
  <LangSelector />

  <p>{allTexts[$activeLocale].alinea1}</p>
  <p>{allTexts[$activeLocale].alinea2}</p>

  <button class="btn" on:click={goToGame}> <img src="./icons/check.png" alt="" /> </button>
</section>
