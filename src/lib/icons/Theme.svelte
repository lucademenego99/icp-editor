<script lang="ts">
  import { darkTheme } from "../../stores";
</script>

<svg id="sunmoon" width="30" height="30">
  <defs>
    <mask id="hole">
      <rect width="100%" height="100%" fill="white" />
      <circle
        id="overlay"
        class="transition-all ease-in-out duration-500 {$darkTheme
          ? 'translate-x-[-43px] translate-y-[7px]'
          : ''}"
        r="22"
        cx="75"
        cy="0"
        fill="black"
      />
    </mask>

    <filter id="blur">
      <feDropShadow
        dx="0"
        dy="0"
        stdDeviation="1"
        flood-color={$darkTheme ? "#dfdfdf" : "gold"}
      />
    </filter>
  </defs>

  <g filter="url(#blur)">
    <circle
      fill={$darkTheme ? "#dfdfdf" : "gold"}
      id="donut"
      r="15"
      cx="15"
      cy="15"
      mask="url(#hole)"
    />
  </g>
</svg>
