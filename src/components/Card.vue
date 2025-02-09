<template>
  <div class="border border-slate-200 rounded-lg shadow-xs bg-white overflow-hidden">

    <div v-if="$slots.header" class="p-6 border-b border-slate-200">
      <slot name="header"></slot>
    </div>

    <div class="p-6">
      <slot></slot>
    </div>

    <div v-if="$slots.footer" class="p-6 border-t border-slate-200">
      <slot name="footer"></slot>
    </div>

  </div>
</template>
