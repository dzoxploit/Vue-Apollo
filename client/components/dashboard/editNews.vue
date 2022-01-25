<template>
  <div :class="$style['edit-news']">
    <div :class="$style['edit-news-wrap']">

    </div>
  </div>
</template>

<script>
export default {
  name: 'edit-news',
  props: {
    editNews: Object,
    handleEditNews: Function,
  },
}
</script>

<style module>
.edit-news {
  position: fixed;
  width: 100%; height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #22283180;
  opacity: 0;
  z-index: -9;
  transition-delay: 0.5s;
}
.edit-news.active {
  z-index: 9;
  opacity: 1;
  transition-delay: 0s;
}
.edit-news-wrap {
  background: #ffffff;
  width: 0; height: 0;
  margin: 20px;
  box-shadow: 0 0 50px #22283140;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 20px;
  overflow: hidden;
  transition: cubic-bezier(0.6,-0.28,0.74,0.05) 0.3s;
  transition-delay: 0s;
}
.edit-news-wrap.active {
  padding: 20px;
  width: 600px; height: 400px;
  transition: cubic-bezier(0.18,0.89,0.32,1.27) 0.3s;
  transition-delay: 0.3s;
}
</style>
