<template>
	<div data-testid="base-input">
		<label v-if="label" :for="name" class="default__label">{{ label }}</label>
		<input :id="name" v-model="model" v-bind="$attrs" :class="customStyles || 'default__input'" />
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { BaseInputProps } from './BaseInput.interfaces';

const { modelValue } = withDefaults(defineProps<BaseInputProps>(), {
	type: 'text',
});

const model = defineModel<string | number>();

onMounted(() => {
	model.value = modelValue;
});
</script>
