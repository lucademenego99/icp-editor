<script lang="ts">
    import Loading from "../icons/Loading.svelte";
    import { showExportingLoading } from "../../stores";
</script>

<div
    class="transition-all absolute flex items-center justify-center top-0 left-0 w-full h-full bg-black/75 z-50 {$showExportingLoading
        ? 'opacity-100 pointer-events-all'
        : 'opacity-0 pointer-events-none'}"
>
    <div
        class="w-[400px] h-[250px] bg-white rounded-lg flex flex-col justify-evenly items-center"
    >
        <Loading />
        <div class="flex flex-col gap-1">
            <h3 class="text-gray-500 text-xl tracking-wider">
                Your file is being generated...
            </h3>
            <p class="text-gray-400 text-sm self-left">
                It should take approximately 30 seconds
            </p>
        </div>
    </div>
</div>
