<!--
 * @Author: fzf404
 * @Date: 2022-09-28 17:05:18
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-10-03 19:07:49
 * @Description: loading 组件
-->

<template>
  <section v-show="show" class="flex-col-center modal z-30 space-y-2">
    <!-- 加载动画 -->
    <LoadSVG class="w-16 load-rotating" />
    <!-- 备注 -->
    <p class="text-intro" v-for="item in remark">{{ item }}</p>
  </section>
</template>

<script setup>
import LoadSVG from '@/assets/layout/load.svg'

const props = defineProps(['show', 'remark'])
</script>
