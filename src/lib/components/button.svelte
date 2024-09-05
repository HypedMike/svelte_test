<svelte:options customElement="my-button" />

<script lang="ts">
    const handleClick = () => {
        alert('ciao');
    }
</script>

<button on:click={handleClick}>
    ciao
</button>