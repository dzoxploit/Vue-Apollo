<template>
  <div :class="$style.news">
    <div :class="$style.cards" v-for="item of news" :key="item.id">
      <div :class="$style.header">
        <button
          type="button"
          :class="$style.pinned"
          class="bx bx-pin"
        >
        </button>
        <p :class="$style.date">{{ formatDate(item.createdAt) }}</p>
        <p :class="[$style.status, $style['status-closed']]" v-if="item.closed">Closed</p>
        <p :class="[$style.status, $style['status-active']]" v-if="!item.closed">Active</p>
      </div>
      <h2 :class="$style.subject">{{ item.subject }}</h2>
      <p :class="$style.body">{{ item.shortDesc }}...</p>
      <div :class="$style.author">
        <span :class="$style.avatar"></span>
        <div :class="$style.text">
          <p :class="$style.fullname">{{ item.author }}</p>
          <p :class="$style.division">Human Resources (HR)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'news-list',
  props: {
    news: Array,
  },
  methods: {
    formatDate(args) {
      const date = new Date(args).toLocaleDateString([], {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
      return date;
    },
  },
}
</script>

<style module>
.news {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 60px 0;
}
.cards {
  border-bottom: 1px solid #22283130;
  padding: 0 0 40px 0;
  cursor: default;
}
.author {
  margin: 20px 0 0 0;
  display: flex;
  align-items: center;
  gap: 10px;
}
.cards:hover .subject {
  text-decoration: underline;
}
.cards .header {
  display: flex;
  align-items: center;
  gap: 10px;
}
.cards .header .pinned {
  font-size: 1.5rem;
  margin: 0 10px 0 0;
}
.cards .header .status {
  padding: 2px 10px;
  border-radius: 2rem;
  font-size: 0.85rem;
}
.status-closed {
  background: #ffbacb;
}
.status-active {
  background: #baffd9;
}
.author .avatar {
  display: block;
  width: 35px; height: 35px;
  border-radius: 50%;
  background: #bac4ff;
  border: 1px solid #707070;
}
.author .fullname {
  font-weight: bold;
  margin: 0 0 2px 0;
}
.author .division {
  font-size: 0.95rem;
}
.subject {
  margin: 10px 0 15px 0;
  font-family: var(--font-head);
  cursor: pointer;
}
</style>
