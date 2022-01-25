<template>
  <div :class="[$style.details, details.isOpen && $style.active]">
    <div :class="[$style['details-wrap'], details.isOpen && $style.active]">
      <div :class="$style.nav">
        <p :class="$style.date">{{ formatDate(news.createdAt) }}</p>
        <div :class="$style.right">
          <p :class="[$style.status, $style['status-closed']]" v-if="news.closed">Closed</p>
          <p :class="[$style.status, $style['status-active']]" v-if="!news.closed">Active</p>
          <button
            type="button"
            class="bx bx-x"
            :class="$style.btn"
            @click="handleDetailsIsOpen(details.data)"
          >
          </button>
        </div>
      </div>
      <div :class="$style.header">
        <h2 :class="$style.subject">{{ news.subject }}</h2>
        <div :class="$style.author">
          <span :class="$style.avatar"></span>
          <div :class="$style.text">
            <p :class="$style.fullname">{{ news.author }}</p>
            <p :class="$style.division">Human Resources (HR)</p>
          </div>
        </div>
      </div>
      <div :class="$style.body" v-html="news.body"></div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'details-news',
  props: {
    details: Object,
    handleDetailsIsOpen: Function,
  },
  data: () => ({
    news: {
      author: '',
      subject: '',
      body: '',
      closed: false,
      createdAt: '',
    },
  }),
  methods: {
    formatDate(args) {
      const date = new Date(args).toLocaleDateString([], {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
      return date;
    },
    async handleGetNewsDetails() {
      try {
        const request = await this.$apollo.query({
          query: gql`
            query ($newsId: String!) {
              NewsDetails (newsId: $newsId) {
                author
                subject
                body
                closed
                createdAt
              }
            }
          `,
          variables: {
            newsId: this.details.data,
          },
        });

        this.news = request.data.NewsDetails;
      }
      catch (error0) {
        console.error(error0.message);
      }
    },
  },
  mounted() {
    if (this.details.isOpen) {
      this.handleGetNewsDetails();
    }
  },
  updated() {
    if (this.details.isOpen) {
      this.handleGetNewsDetails();
    }
  },
}
</script>

<style module>
.details {
  position: fixed;
  width: 100%; height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #22283180;
  z-index: -9;
  opacity: 0;
  transition-delay: 0.5s;
}
.details.active {
  z-index: 9;
  opacity: 1;
  transition-delay: 0s;
}
.details-wrap {
  width: 0px; height: 0;
  background: #ffffff;
  box-shadow: 0 0 50px #22283140;
  overflow: hidden;
  margin: 20px;
  transition: cubic-bezier(0.6,-0.28,0.74,0.05) 0.3s;
  transition-delay: 0s;
  display: grid;
  grid-template-rows: auto auto 1fr;
  font-family: var(--font-body);
  overflow: auto;
}
.details-wrap.active {
  padding: 20px;
  width: 600px;
  height: 400px;
  transition: cubic-bezier(0.18,0.89,0.32,1.27) 0.3s;
  transition-delay: 0.3s;
}
.nav {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.nav .right {
  display: flex;
  gap: 20px;
}
.nav .btn {
  font-size: 1.5rem;
}
.nav .status {
  border-radius: 2rem;
  padding: 5px 15px;
}
.status-closed {
  background: #ffbacb;
}
.status-active {
  background: #baffd9;
}
.header {
  margin: 10px 0 40px 0;
}
.author {
  margin: 20px 0 0 0;
  display: flex;
  align-items: center;
  gap: 10px;
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

@media screen and (max-width: 500px) {
  .details {
    transition-delay: 0s;
    transition: 0.2s ease-in;
    transform: translate(-100%, 0);
    z-index: 9;
    opacity: 1;
  }
  .details.active {
    transform: translate(0, 0);
    transition: 0.2s ease-out;
    transition-delay: 0s;
  }
  .details-wrap {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    transition: 0.2s ease-in;
    transition-delay: 0s;
    z-index: 9;
    opacity: 1;
    box-shadow: none;
  }
  .details-wrap.active {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    transition: 0.2s ease-out;
    transition-delay: 0s;
  }
  .nav {
    padding: 20px 20px 0 20px;
  }
  .header {
    padding: 0 20px;
  }
  .body {
    padding: 0 20px 20px 20px;
  }
}
</style>
