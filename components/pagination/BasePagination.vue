<template>
  <div class="base-pagination">
    <div
      v-if="page !== 1"
      class="base-pagination-prev"
      :class="{'base-pagination-disabled': load}"
      @click.prevent="paginate(page - 1)"
    >
      <svg>
        <use xlink:href="/img/sprites/arrow-down.svg#arrow-down" />
      </svg>
    </div>
    <div
      v-if="totalItems > 0"
      class="base-pagination-page"
      :class="{
        'base-pagination_active': page === 1,
        'base-pagination-disabled': load
      }"
      @click.prevent="paginate(1)"
    >
      1
    </div>
    <div
      v-if="start"
      class="base-pagination-dot"
    >
      ...
    </div>
    <div
      v-for="item in count"
      :key="item"
      class="base-pagination-page"
      :class="{
        'base-pagination_active': page === item,
        'base-pagination-disabled': load
      }"
      @click.prevent="paginate(item)"
    >
      {{ item }}
    </div>
    <div
      v-if="end"
      class="base-pagination-dot"
    >
      ...
    </div>
    <div
      v-if="totalPages > 1"
      class="base-pagination-page"
      :class="{
        'base-pagination_active': page === totalPages,
        'base-pagination-disabled': load
      }"
      @click.prevent="paginate(totalPages)"
    >
      {{ totalPages }}
    </div>
    <div
      v-if="page !== totalPages"
      class="base-pagination-next"
      :class="{'base-pagination-disabled': load}"
      @click.prevent="paginate(page + 1)"
    >
      <svg>
        <use xlink:href="/img/sprites/arrow-down.svg#arrow-down" />
      </svg>
    </div>
  </div>
</template>

<script>
import eventBus from '../../eventBus'

export default {
  name: 'BasePagination',
  props: {
    page: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 1
    },
    totalItems: {
      type: Number,
      default: 0
    },
    load: {
      type: Boolean,
      default: false
    },
    eventName: {
      type: String,
      default: 'base'
    }
  },
  computed: {
    start () {
      return this.page - 3 > 1
    },
    end () {
      return this.page + 3 < this.totalPages
    },
    count () {
      const arr = []
      const diff = this.totalPages - 2

      if (diff > 0) {
        for (let i = -2; i <= 2; i++) {
          if (this.page + i > 1 && this.page + i < this.totalPages) {
            arr.push(this.page + i)
          }
        }
      }

      return arr
    }
  },
  methods: {
    paginate (page) {
      eventBus.$emit(`${this.eventName}`, { page })
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.base-pagination {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 20px 0 0;
}

.base-pagination-prev,
.base-pagination-next,
.base-pagination-page,
.base-pagination-dot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    margin-right: 10px;
    font-size: 14px;
    font-weight: 500;
    border: 1px solid $darkGrey;
    background-color: $white;
    border-radius: 10px;
    cursor: pointer;
    transition-property: background-color;
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.base-pagination-dot {
  background-color: transparent;
}

.base-pagination-prev:hover,
.base-pagination-next:hover,
.base-pagination-page:hover {
    background-color: $brandColor;
}

.base-pagination-prev,
.base-pagination-next {
  position: relative;
  border: none;

  &:hover {
    background-color: transparent;

    svg {
      fill: $brandColor;
    }
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 60%;
    fill: $black;
    transition-property: fill;
    transition-duration: 200ms;
    transition-timing-function: ease-in-out;
  }
}

.base-pagination-prev {
    transform: rotate(90deg);
}

.base-pagination-next {
    margin-right: 0;
    transform: rotate(-90deg);
}

.base-pagination-dot {
    align-items: flex-end;
    border: none;
    cursor: unset;
}

.base-pagination_active {
    background-color: $brandColor;
    pointer-events: none;
}

.base-pagination-disabled {
  pointer-events: none;
  cursor: auto;
  animation: pagshadow 500ms ease infinite alternate;
}

@keyframes pagshadow {
  0% {
    box-shadow: 0 0 0 transparent;
  }
  100% {
    box-shadow: 0 0 10px rgba($brandColor, 0.7);
  }
}

@media (max-width: 768px) {

    .base-pagination {
        justify-content: center;
    }

    .base-pagination-prev,
    .base-pagination-next,
    .base-pagination-page,
    .base-pagination-dot {
        margin-bottom: 10px;
    }
}
</style>
