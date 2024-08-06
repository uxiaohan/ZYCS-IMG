<template>
  <a-watermark class="page_main" content="骤雨重山图床" :alpha="0.1">
    <header>
      <h1>骤雨重山图床</h1>
      <h2>致力于为开发者提供便捷、免费、稳定、快速的图床服务。</h2>
      <div class="desc">
        <p>无限图片储存数量，你可以上传不限数量的图片！</p>
        <p>图片首次访问后缓存，"永久"有效，包括全球分布的 CDN，以确保尽可能快地提供图像.</p>
        <p>项目使用无服务器服务搭建，托管在 <a-tag color="gray"><template #icon><icon-cloud /></template>Cloudflare Pages</a-tag> 上运行.
        </p>
        <p>开源地址： <a-link href="https://github.com/uxiaohan/ZYCS-IMG" target="_blank" icon>ZYCS-IMG</a-link></p>
      </div>
    </header>
    <main>
      <a-upload draggable :action="ACTION_API" multiple :show-link="false" :image-preview="true"
        :show-remove-button="false" accept=".png,.jpg,.jpeg,.gif" :on-before-upload="checkImageSizeFn"
        @success="scrollToBottom">
        <template #upload-item="item">
          <div class="vh-img-item" :key="item.fileItem.uid">
            <a-image class="vh_img_val" :src="item.fileItem.url" />
            <div class="vh_img_text" v-if="item.fileItem.status == 'uploading'">
              <a-skeleton :animation="true">
                <a-space direction="vertical" :style="{ width: '100%' }" size="mini">
                  <a-skeleton-line :rows="2" />
                </a-space>
              </a-skeleton>
            </div>
            <div class="vh_img_text with_value" v-else>
              <section>
                <a-input :error="item.fileItem.response == 'Failed'" :default-value="item.fileItem.response" readonly
                  size="mini" @click="item.fileItem.response != 'Failed' && copyStr(item.fileItem.response)">
                  <template #append v-if="item.fileItem.response != 'Failed'">URL</template>
                </a-input>
                <a-input :error="item.fileItem.response == 'Failed'"
                  :default-value="`![${item.fileItem.name}](${item.fileItem.response})`" readonly size="mini"
                  @click="item.fileItem.response != 'Failed' && copyStr(`![${item.fileItem.name}](${item.fileItem.response})`)">
                  <template #append v-if="item.fileItem.response != 'Failed'">Markdown</template>
                </a-input>
              </section>
              <a-popover title="图片二维码">
                <qrcode-vue class="qr" :value="item.fileItem.response" :size="56" level="H" />
                <template #content>
                  <qrcode-vue class="qr" :value="item.fileItem.response" :size="166" level="H" />
                </template>
              </a-popover>
            </div>
          </div>
        </template>
      </a-upload>
    </main>
    <footer>
      <p><img src="./assets/svg/ing.svg"></p>
      <p>
        <a href="https://pages.cloudflare.com" target="_blank" rel="noopener noreferrer"><img
            src="./assets/svg/framework.svg"></a>
        <a href="https://wordpress.com" target="_blank" rel="noopener noreferrer"><img src="./assets/svg/cache.svg"></a>
        <a href="https://www.cloudflare.com/zh-cn/application-services/products/cdn/" target="_blank"
          rel="noopener noreferrer"><img src="./assets/svg/cdn.svg"></a>
        <a href="https://vuejs.org" target="_blank" rel="noopener noreferrer"><img src="./assets/svg/web.svg"></a>
      </p>
    </footer>
  </a-watermark>
</template>
<script setup lang="ts">
import { nextTick } from 'vue'
import { Message } from '@arco-design/web-vue'
import QrcodeVue from 'qrcode.vue'
const ACTION_API = import.meta.env.VITE_IMG_API_URL;


// 检查图片大小
const checkImageSizeFn = (file: any) => {
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    Message.error(`图片大小不能超过 ${maxSize / 1024 / 1024}MB`);
    return false;
  }
  return true;
}

// 复制返回地址
const copyStr = async (v: any) => {
  try {
    await navigator.clipboard.writeText(v);
  } catch (error) {
    const i = document.createElement("textarea");
    i.value = v;
    document.body.appendChild(i);
    i.select();
    document.body.removeChild(i);
  }
  Message.success('Copy Success')
}

// 上传完毕滚动到最下面
const scrollToBottom = () => {
  nextTick(() => {
    const imgListDom: any = document.querySelector('.arco-upload-list');
    imgListDom.scrollTo({ top: imgListDom.scrollHeight, behavior: "smooth" });
  })
}
</script>
<style scoped lang="less">
@import './assets/less/main.less';
</style>
