<template>
  <section class="container">
    <template v-if="route.name === 'Posts'">
      <h1 class="large text-primary">
        Posts
      </h1>
      <p class="lead">
        <i class="fas fa-user" /> Welcome to the community!
      </p>
    </template>

    <template v-else>
      <router-link
        to="/posts"
        class="btn"
      >
        Back To Posts
      </router-link>
      <div class="post bg-white p-1 my-1">
        <div>
          <router-link :to="`/profiles/${post.user}`">
            <img
              class="round-img"
              :src="post.avatar"
              alt="avatar"
            >
            <h4 v-text="post.name" />
          </router-link>
        </div>
        <div>
          <p
            class="my-1"
            v-text="post.text"
          />
        </div>
      </div>
    </template>

    <div class="post-form">
      <div class="bg-primary p">
        <h3 v-text="route.name === 'Posts' ? 'Say Something...' : 'Leave A Comment'" />
      </div>
      <form
        class="form my-1"
        @submit.prevent="onSubmit"
      >
        <textarea
          v-model="content.text"
          name="text"
          cols="30"
          rows="5"
          :placeholder="route.name === 'Posts' ? 'Create a post' : 'Comment on this post'"
          required
        />
        <input
          type="submit"
          class="btn btn-dark my-1"
          value="Submit"
        >
      </form>
    </div>

    <div
      v-if="route.name === 'Posts'"
      class="posts"
    >
      <div
        v-for="post in posts"
        :key="post._id"
        class="post bg-white p-1 my-1"
      >
        <div>
          <router-link :to="`/profiles/${post.user}`">
            <img
              class="round-img"
              :src="post.avatar"
              alt="avatar"
            >
            <h4 v-text="post.name" />
          </router-link>
        </div>
        <div>
          <p
            class="my-1"
            v-text="post.text"
          />

          <p
            class="post-date"
            v-text="`Posted on ${moment(post.date).format('DD/MM/YYYY')}`"
          />
          <button
            type="button"
            class="btn btn-light"
            @click="onLike(post._id)"
          >
            <i class="fas fa-thumbs-up" />
            <span v-text="post.likes.length" />
          </button>
          <button
            type="button"
            class="btn btn-light"
            @click="onDislike(post._id)"
          >
            <i class="fas fa-thumbs-down" />
          </button>
          <router-link
            :to="`/posts/${post._id}`"
            class="btn btn-primary"
          >
            Discussion <span
              class="comment-count"
              v-text="post.comments.length"
            />
          </router-link>
          <button
            v-if="post.user === currentUserId"
            type="button"
            class="btn btn-danger"
            @click="onDeletePost(post._id)"
          >
            <i class="fas fa-times" />
          </button>
        </div>
      </div>
    </div>

    <div
      v-else
      class="comments"
    >
      <div
        v-for="comment in post.comments"
        :key="comment._id"
        class="post bg-white p-1 my-1"
      >
        <div>
          <router-link :to="`/profiles/${comment.user}`">
            <img
              class="round-img"
              :src="comment.avatar"
              alt="avatar"
            >
            <h4 v-text="comment.name" />
          </router-link>
        </div>
        <div>
          <p
            class="my-1"
            v-text="comment.text"
          />
          <p
            class="post-date"
            v-text="`Posted on ${moment(comment.date).format('DD/MM/YYYY')}`"
          />

          <button
            v-if="comment.user === currentUserId"
            type="button"
            class="btn btn-danger"
            @click="onDeleteComment(comment._id)"
          >
            <i class="fas fa-times" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { store } from '../../store'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'

export default {
  name: 'PostLayout',

  inject: ['moment'],

  async beforeRouteEnter (to, from, next) {
    try {
      if (to.name === 'Posts') {
        await store.dispatch('post/getPosts')
      } else {
        await store.dispatch('post/getPost', to.params.postId)
      }
    } catch (e) {
      await store.dispatch('showAlert', {
        isShow: true,
        status: 'danger',
        data: e.response.data.errors
      })
    }
    next()
  },

  setup () {
    const store = useStore()
    const route = useRoute()

    const content = ref({
      text: ''
    })

    const post = computed(() => store.getters['post/post'])
    const posts = computed(() => store.getters['post/posts'])
    const currentUserId = computed(() => store.getters['auth/currentUserId'])

    const onSubmit = async () => {
      try {
        if (route.name === 'Posts') {
          await store.dispatch('post/addPost', content.value)
          await store.dispatch('showAlert', {
            isShow: true,
            status: 'success',
            data: [{msg: 'Successfully add a post'}]
          })
          await store.dispatch('post/getPosts')
        } else {
          await store.dispatch('post/addComment', {
            postId: route.params.postId,
            body: content.value
          })
          await store.dispatch('showAlert', {
            isShow: true,
            status: 'success',
            data: [{msg: 'Successfully add a comment'}]
          })
          await store.dispatch('post/getPost', route.params.postId)
        }
        content.value.text = ''
      } catch (e) {
        await store.dispatch('showAlert', {
          isShow: true,
          status: 'danger',
          data: e.response.data.errors
        })
      }
    }

    const onLike = async (postId) => {
      try {
        await store.dispatch('post/likePost', postId)
        await store.dispatch('post/getPosts')
      } catch (e) {
        await store.dispatch('showAlert', {
          isShow: true,
          status: 'danger',
          data: [e.response.data]
        })
      }
    }

    const onDislike = async (postId) => {
      try {
        await store.dispatch('post/dislikePost', postId)
        await store.dispatch('post/getPosts')
      } catch (e) {
        await store.dispatch('showAlert', {
          isShow: true,
          status: 'danger',
          data: [e.response.data]
        })
      }
    }

    const onDeletePost = async (postId) => {
      try {
        await store.dispatch('post/deletePost', postId)
        await store.dispatch('post/getPosts')
      } catch (e) {
        await store.dispatch('showAlert', {
          isShow: true,
          status: 'danger',
          data: e.response.data.errors
        })
      }
    }

    const onDeleteComment = async (commentId) => {
      try {
        await store.dispatch('post/deleteComment', {
          postId: route.params.postId,
          commentId
        })
        await store.dispatch('post/getPost', route.params.postId)
      } catch (e) {
        await store.dispatch('showAlert', {
          isShow: true,
          status: 'danger',
          data: e.response.data.errors
        })
      }
    }

    return {
      post,
      posts,
      currentUserId,
      content,
      route,
      onSubmit,
      onLike,
      onDislike,
      onDeletePost,
      onDeleteComment
    }
  }
}
</script>

<style scoped>

</style>
