<template>
  <div :class="$style.news">
    <div :class="$style.cards" v-for="(item, index) of news" :key="item.id">
      <div :class="$style.menu">
        <button
          type="button"
          :class="$style.btn"
          @click="handleDeleteNews({
            newsId: item.id,
            index,
          })"
        >
          <i class="bx bx-trash"></i>
          <p :class="$style.text">Delete</p>
        </button>
        <button
          type="button"
          :class="$style.btn"
          @click="handleUpdateNews({
            newsId: item.id,
            closed: !item.closed,
            index,
          })"
        >
          <i class="bx bx-edit"></i>
          <p :class="$style.text">Edit</p>
        </button>
        <button
          type="button"
          :class="$style.btn"
          @click="handleUpdateNews({
            data: item,
            index,
          })"
        >
          <i class="bx bx-window-close"></i>
          <p :class="$style.text">{{ item.closed ? 'Activate' : 'Closed' }}</p>
        </button>
      </div>
      <div :class="$style.header">
        <div :class="$style.left">
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
        <button
          type="submit"
          v-if="permissions()"
          :class="[$style.btn, $style['action-btn']]"
          class="bx bx-dots-vertical-rounded"
          @click="handleMenuIsOpen(index)"
        >
        </button>
      </div>
      <h2 :class="$style.subject" @click="handleDetailsIsOpen(item.id)">{{ item.subject }}</h2>
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
import gql from 'graphql-tag';

export default {
  name: 'news-list',
  props: {
    news: Array,
    handleDetailsIsOpen: Function,
    handleGetAllNews: Function,
  },
  data: () => ({
    menuIsOpen: false,
  }),
  methods: {
    permissions() {
      return this.$store.getters.isLoggedIn && this.$store.getters.getEmployee.division === 'hr'
    },
    formatDate(args) {
      const date = new Date(args).toLocaleDateString([], {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
      return date;
    },
    handleMenuIsOpen(args) {
      const el = document.getElementsByClassName(this.$style.menu);
      const exists = el[args].classList.value.includes(this.$style.active);

      let i = 0;

      while (i < el.length) {
        el[i].classList.remove(this.$style.active);
        i += 1;
      }

      if (exists) {
        el[args].classList.remove(this.$style.active);
      } else {
        el[args].className += ` ${this.$style.active}`;
      }
    },
    async handleDeleteNews(args) {
      try {
        this.handleMenuIsOpen(args.index);

        await this.$apollo.mutate({
          mutation: gql`
            mutation ($newsId: String!) {
              DeleteNews (newsId: $newsId) {
                success
                message
              }
            }
          `,
          variables: {
            newsId: args.newsId,
          },
        });

        setTimeout(() => {
          this.handleGetAllNews();
        }, 1000);
      }
      catch (error0) {
        console.error(error0.message);
      }
    },
    async handleUpdateNews(args) {
      try {
        this.handleMenuIsOpen(args.index);

        await this.$apollo.mutate({
          mutation: gql`
            mutation ($newsId: String!, $closed: Boolean!) {
              UpdateNews (newsId: $newsId, closed: $closed) {
                success,
                message
              }
            }
          `,
          variables: {
            newsId: args.data.id,
            closed: !args.data.closed,
          },
        });

        this.handleGetAllNews();
      }
      catch (error0) {
        console.error(error0.message);
      }
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
  position: relative;
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
.cards .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.header .left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.header .action-btn {
  font-size: 1.5rem;
  width: 30px; height: 30px;
  border-radius: 50%;
  transform: translate(8px, 0);
  transition: 0.3s;
  cursor: pointer;
}
.header .action-btn:hover {
  background: #bac4ff50;
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
  font-family: var(--font-body);
  cursor: pointer;
}

.menu {
  position: absolute;
  right: 0;
  transform: translate(-90px, 20px);
  display: grid;
  background: #ffffff;
  z-index: -1;
  opacity: 0;
  transition: cubic-bezier(0.6,-0.28,0.74,0.05) 0.3s;
  transition-delay: 0s;
  width: 0; height: 0;
  box-shadow: 0 2px 5px #22283120, 0 2px 50px #22283110;
}
.menu.active {
  padding: 10px;
  transform: translate(-30px, 20px);
  width: 120px; height: 120px;
  z-index: 1;
  opacity: 1;
  transition: cubic-bezier(0.18,0.89,0.32,1.27) 0.3s;
  transition-delay: 0.3s;
}
.menu .btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
}
.menu .btn:hover {
  background: #bac4ff30;
}

@media screen and (max-width: 500px) {
  .menu {
    box-shadow: 0 2px 5px #22283120, 0 2px 40px #22283130;
  }
}
</style>
