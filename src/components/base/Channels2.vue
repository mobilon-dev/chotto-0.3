<template>
  <div ref="customDiv">
    <div @click="toggle">
      <div class="popover">
        <span v-if="!selectedChannel">select channel</span>
        <span v-if="selectedChannel">
          <span v-if="selectedChannel.icon">
            <img :src="selectedChannel.icon" height="16" width="16">&nbsp;
          </span>
          <span>{{ selectedChannel.title }}</span>
        </span>
      </div>
    </div>
    <div v-if="showPopup" @click.stop>
      <div class="popover-content">
        <ul>
          <li v-for="channel in channels"
            :key="channel.channelId"
            @click="selectChannel(channel)"
            >{{ channel.title }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

  const showPopup = ref(false)
  const customDiv = ref(null)

  const props = defineProps({
    channels: {
      type: Array,
      required: false,
    }
  })

  const emit = defineEmits(['selectChannel']);

  const getDefaultChannel = () => {
    return props.channels.find(channel => channel.type === 'default');
  }
  const selectedChannel = ref(getDefaultChannel())

  const selectChannel = (channel) => {
    // console.log('channel selected', channel);
    selectedChannel.value = channel;
    toggle();
    emit('selectChannel', selectedChannel.value);
  }

  const toggle = () => {
    showPopup.value = !showPopup.value
  }

  const handleClickOutside = (event) => {
    if (customDiv.value && !customDiv.value.contains(event.target)) {
      showPopup.value = false
    }
  }

  onMounted(() => {
    document.addEventListener("click", handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside)
  })
</script>

<style scoped>
.popover {
  margin: 0;
  font-size: 14px;
  text-transform: uppercase;
  background: #fff;
  color: #3794ff;
  padding: 12px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.popover:hover {
  background: #2b2b2b;
  color: #fff;
}

.popover-content {
  position: absolute;
  background: #fff;
  border-radius: 6px;
  margin-top: 4px;
  padding: 16px;
  color: #333;
  min-width: 200px;
  text-align: left;
}
</style>
