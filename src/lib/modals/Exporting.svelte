<script lang="ts">
    export let show: boolean = false;
</script>

<div
    class="transition-all absolute flex items-center justify-center top-0 left-0 w-full h-full bg-black/75 z-50 {show
        ? 'opacity-100 pointer-events-all'
        : 'opacity-0 pointer-events-none'}"
>
    <div
        class="w-[400px] h-[250px] bg-white rounded-lg flex flex-col justify-evenly items-center"
    >
        <svg
            width="75"
            height="75"
            viewBox="0 0 57 57"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#fff"
        >
            <g fill="#666666" fill-rule="evenodd">
                <g transform="translate(1 1)" stroke-width="2">
                    <circle cx="5" cy="50" r="5">
                        <animate
                            attributeName="cy"
                            begin="0s"
                            dur="2.2s"
                            values="50;5;50;50"
                            calcMode="linear"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="cx"
                            begin="0s"
                            dur="2.2s"
                            values="5;27;49;5"
                            calcMode="linear"
                            repeatCount="indefinite"
                        />
                    </circle>
                    <circle cx="27" cy="5" r="5">
                        <animate
                            attributeName="cy"
                            begin="0s"
                            dur="2.2s"
                            from="5"
                            to="5"
                            values="5;50;50;5"
                            calcMode="linear"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="cx"
                            begin="0s"
                            dur="2.2s"
                            from="27"
                            to="27"
                            values="27;49;5;27"
                            calcMode="linear"
                            repeatCount="indefinite"
                        />
                    </circle>
                    <circle cx="49" cy="50" r="5">
                        <animate
                            attributeName="cy"
                            begin="0s"
                            dur="2.2s"
                            values="50;50;5;50"
                            calcMode="linear"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="cx"
                            from="49"
                            to="49"
                            begin="0s"
                            dur="2.2s"
                            values="49;5;27;49"
                            calcMode="linear"
                            repeatCount="indefinite"
                        />
                    </circle>
                </g>
            </g>
        </svg>
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
