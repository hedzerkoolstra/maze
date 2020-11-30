<script>
  import { activeLocale } from "../../store";

  function setLocale(locale) {
    console.log(locale);
    activeLocale.set(locale);
  }
  let allLocales = ["english", "nederlands"];
</script>

<style>
  .pick-language {
    display: flex;
    justify-content: flex-end;
  }
</style>

<div class="pick-language">
  {#each allLocales as locale}
    <button class="btn btn--text {locale == $activeLocale ? 'active' : ''}" on:click={() => setLocale(locale)}>{locale} </button>
  {/each}
</div>
