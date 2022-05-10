<template>
    <li>
		<label>
			<input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)"/>
			<span v-show="!todo.isEdit">{{todo.title}}</span>
			<input
			v-show="todo.isEdit"
			type="text"
			:value="todo.title"
			@blur="handleBlur(todo,$event)"
			ref="inputTitle"
			>
		</label>
		<button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
		<button class="btn btn-edit" @click="handleEdit(todo)">编辑</button>
	</li>
</template>

<script>
/* eslint-disable */
import pubsub from 'pubsub-js'
export default {
    name: 'MyItem',
    // 声明接受todo对象
    props: ['todo','checkTodo','deleteTodo'],
	methods:{
		handleCheck(id){
			// 通知App组件将对应的todo对象的done值取反
			// 数据在哪里 操作数据的方法就在哪里
			// this.checkTodo(id)
			this.$bus.$emit('checkTodo',id)
		},
		// 删除
			handleDelete(id){
				if(confirm('确定删除吗？')){
					// 通知App组件将对应的todo对象删除
					// this.deleteTodo(id)
					// this.$bus.$emit('deleteTodo',id)
					pubsub.publish('deleteTodo',id)
				}
			},
		// 编辑
		handleEdit(todo){
			if(todo.hasOwnProperty('isEdit')){
				todo.isEdit = true
			}else{
				this.$set(todo,'isEdit',true)
			}
			// this.$nextTick(回调函数)
			// 在下一次DOM更新结束后执行其指定的回调
			// 当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行
			this.$nextTick(function() {
				this.$refs.inputTitle.focus() // 获取焦点
			})
		},
		// 失去焦点回调(真正执行修改逻辑)
		handleBlur(todo,e){
			todo.isEdit = false
			if(!e.target.value.trim()) return alert('输入不能为空')
			this.$bus.$emit('updateTodo',todo.id,e.target.value)
		}
	}
}
</script>

<style scoped>
	/*item*/
	li {
		list-style: none;
		height: 36px;
		line-height: 36px;
		padding: 0 5px;
		border-bottom: 1px solid #ddd;
	}

	li label {
		float: left;
		cursor: pointer;
	}

	li label li input {
		vertical-align: middle;
		margin-right: 6px;
		position: relative;
		top: -1px;
	}

	li button {
		float: right;
		display: none;
		margin-top: 3px;
	}

	li:before {
		content: initial;
	}

	li:last-child {
		border-bottom: none;
	}

	li:hover{
		background-color: #ddd;
	}

	li:hover button{
		display: block;
	}
</style>