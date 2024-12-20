
## 前言

该文章解决了针对 vue 的 scoped 情况下的对第三方样式修改问题。
介绍了 `scoped` 的作用
介绍了样式穿透的作用
总结了三种不同情况修改样式的方法。

## 问题

代码遇到 css 样式不生效的问题，部分代码如下

```vue
<el-select 
  v-model="form.poolName" 
  placeholder="请选择资源组" 
  style="width: 100%;"
  popper-class="custom-dropdown"
>
  <el-option
    v-for="item in options"
    :key="item.value"
    :label="item.label"
    :value="item.value"
  ></el-option>
</el-select>

<style scoped>
	.custom-dropdown {
   width: 400px !important;
   background-color: rgb(226, 21, 21);
   border: 1px solid #ddd;
 }
</style>
```

`popper-class` 可以对 `select` 的下拉框部分设置样式，这是 `html` 原生的 `select` 无法做到的。但是当我设置 `style 为 scoped` 的时候，`vue` 会把这个样式和这个组件绑定在一起，最终编译完呈现如下效果

![[Pasted image 20241015145631.png]]
![[Pasted image 20241015145600.png]]

可以看到 `el-select` 的 `class="custom-dropdown"` 加了一个独立属性 `data-v` ，并且选择器也是自动加上了属性选择变为了类【属性】的形式。**给组件根元素加上特殊属性这就是 `scoped` 的作用**

但是当我希望这个把这个 `custom-dropdown` 应用到 `popper-class="custom-dropdown"` 的时候，就出现问题，因为这个 popper-class 最后编译解析出来是一个普通的类，这个类的元素并没有加上属性。也就导致我写的样式 `custom-dropdown` 没有被应用上去，最后在开发者工具上找不到这个样式的选择器

![[Pasted image 20241015150028.png]]

他没有被赋予表明是该组件样式的 `data-v` 所以该样式失效。

一开始我以为是样式穿透问题，但是加了 `deep`  也没有用，原因是我选中的类所在的组件根本不是我组件的子组件，`option` 下拉框 自己另开了一片区域。


## 解决

![[Pasted image 20241015170751.png]]

`el-select` 和 `option` 不属于一个组件，`option` 有一个独立的区域独立于 `app` 之外，也就是他的样式不受 ` scoped ` 的限制，一旦用到 ` data-v ` 的选择器（也就是我们在 scope 里面写样式），都选择不到 ` option ` 的样式。

最后实现：

```css

.custom-dropdown {width: 1000px;}
```

我找到了专属于某个 select 的 option 下拉框区域的 ID。自己在全局的 css 样式中选择了这个专属样式，这才完成对此的修改。


## 样式穿透

前置条件使用了 `scoped` ，当父组件想修改子组件里面的样式的时候，如果直接写子组件的样式，除了子组件根节点的样式，别的都是识别不到的。

要加上 `:：v-deep` 这个时候会给组件的作用域样式 `<style scoped>` 的每一个深度作用选择器前面的一个选择器单元增加一个属性选择器 `[data-v-实例标识]` ，示例：假设原选择器为 `.cls #id >>> div`，则更改后的选择器为 `.cls #id[data-v-e0f690c0] div`；


## 总结

通过这个问题，我了解了如何通过开发者工具定位一个 DOM 的样式，并且修改样式。

**以下结论针对 vue 的 scoped。**

如果是子组件的跟样式，直接修改

如果是子组件里的某个样式，用 `::v-deep`

如果是特殊的，option 下拉框等，最终 html 呈现不在组件内部，用全局样式和特定选择器修改。

```vue
<script setup>
import { ElButton, ElSelect,ElOption } from 'element-plus';

</script>

<template>
  <div>
    <el-button>Default</el-button>
    <el-select >
      <el-option>1</el-option>
      <el-option>2</el-option>
      <el-option>3</el-option>
      <el-option>4</el-option>
    </el-select>
  </div>
</template>

<style scoped>
  .el-button{
    width: 500px;
    display: block;
  }
  ::v-deep .el-select__caret{
    color: red;
  }
</style>
```

## 参考资料

[scoped,deep的原理](https://juejin.cn/post/7023343999909888037)
[样式穿透](https://bilibili.com/video/BV1Jv41117QN/?spm_id_from=333.337.search-card.all.click&vd_source=115cedcdb1996c6483fb453252e441e6)