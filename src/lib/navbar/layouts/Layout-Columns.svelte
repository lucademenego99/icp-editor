<script lang="ts">
    export let isActive: boolean;
</script>

<div
    class="flex justify-center items-center relative cursor-pointer rounded-sm w-full pt-[56.25%] bg-white transition-all hover:bg-[#adadad] {isActive
        ? 'border-solid border-2 border-[#c3073f]'
        : ''}"
>
    <div
        class="absolute rounded-lg top-[40%] left-[10%] w-[35%] h-[20%] bg-[#6c6c6c]"
    />
    <div
        class="absolute rounded-lg top-[40%] right-[10%] w-[35%] h-[20%] bg-[#6c6c6c]"
    />
</div>
