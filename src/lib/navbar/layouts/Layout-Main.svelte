<script lang="ts">
    export let isActive: boolean;
</script>

<div
    class="flex justify-center items-center relative cursor-pointer rounded-sm w-full pt-[56.25%] bg-white transition-all hover:bg-[#adadad] {isActive
        ? 'border-solid border-2 border-[#c3073f]'
        : ''}"
>
    <div class="absolute rounded-lg top-[30%] w-[60%] h-[15%] bg-[#6c6c6c]" />
    <div class="absolute rounded-lg top-[55%] w-[40%] h-[10%] bg-[#6c6c6c]" />
</div>
