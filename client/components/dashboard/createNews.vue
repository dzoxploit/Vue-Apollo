<template>
  <div :class="[$style['create-news'], createNewsIsOpen && $style.active]">
    <div :class="[$style['create-news-wrap'], createNewsIsOpen && $style.active]">
      <div :class="$style.header">
        <h2 :class="$style.title">Create News</h2>
        <button
          type="button"
          :class="$style.btn"
          class="bx bx-x"
          @click="handleCreateNewsIsOpen"
        >
        </button>
      </div>
      <form method="post" :class="$style.form" @submit.prevent="handleSubmit">
        <label for="subject" :class="$style.fields">
          <i class="bx bx-comment-detail" :class="$style.icon"></i>
          <input
            type="subject"
            name="subject"
            id="subject"
            :class="$style.control"
            placeholder="Subject"
            v-model="form.subject"
          >
        </label>
        <label for="body" :class="$style.fields">
          <textarea
            name="body"
            id="body"
            :class="$style.control"
            v-model="form.body"
          >
          </textarea>
        </label>
        <div :class="$style.action">
          <button type="submit" :class="$style['submit-btn']">Create</button>
          <input
            type="file"
            name="file"
            id="file"
            :class="[$style.control, $style['control-file']]"
          >
          <label for="file" class="bx bx-paperclip" :class="$style['file-btn']"></label>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { gql } from 'apollo-boost';

export default {
  name: 'create-news',
  props: {
    createNewsIsOpen: Boolean,
    handleCreateNewsIsOpen: Function,
    handleGetAllNews: Function,
  },
  data: () => ({
    form: {
      subject: '',
      shortDesc: '',
      body: '',
      file: null,
    },
  }),
  methods: {
    async handleSubmit() {
      try {
        const { form } = this;

        const request = await this.$apollo.mutate({
          mutation: gql`
            mutation ($author: String!, $subject: String!, $shortDesc: String!, $body: String!) {
              CreateNews (author: $author, subject: $subject, shortDesc: $shortDesc, body: $body) {
                success,
                message,
              }
            }
          `,
          variables: {
            author: 'Febriadji',
            subject: form.subject,
            shortDesc: form.body.slice(0, 200),
            body: `<p>${form.body.replace(/\n/g, '</p>\n<p>')}</p>`,
          },
        });

        const response = request.data.CreateNews;

        if (!response.success) throw response;

        this.form = {
          subject: '',
          shortDesc: '',
          body: '',
          file: null,
        }

        setTimeout(() => this.handleCreateNewsIsOpen(), 1000);
      }
      catch (error0) {
        console.error(error0.message);
      }
    },
  },
}
</script>

<style module>
.create-news {
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
.create-news.active {
  z-index: 9;
  opacity: 1;
  transition-delay: 0s;
}
.create-news-wrap {
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
.create-news-wrap.active {
  padding: 20px;
  width: 600px; height: 400px;
  transition: cubic-bezier(0.18,0.89,0.32,1.27) 0.3s;
  transition-delay: 0.3s;
}
.header {
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.header .btn {
  font-size: 1.5rem;
  cursor: pointer;
}
.form {
  display: grid;
  grid-template-rows: auto 1fr auto;
}
.fields {
  border-bottom: 1px solid #22283180;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}
.fields .icon {
  font-size: 1.5rem;
}
.control {
  width: 100%;
}
.fields:nth-of-type(2) {
  border: none;
}
textarea {
  height: 100%;
}
.action {
  display: flex;
  align-items: center;
  gap: 10px;
}
.action .submit-btn {
  padding: 10px 20px;
  background: #baffd9;
  border-radius: 10px;
  border: 1px solid #688d79;
  cursor: pointer;
}
.control-file {
  display: none;
}
.file-btn {
  font-size: 1.5rem;
  cursor: pointer;
  transform: rotate(-90deg);
  width: 40px; height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}
.file-btn:hover {
  background: #bac4ff50;
}

@media screen and (max-width: 540px) {
  .create-news-wrap.active {
    height: 350px;
  }
}
</style>
