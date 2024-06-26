<template>
  <a-button type="primary" class="editable-add-btn" @click="handleAdd" style="margin-bottom: 8px"> <template #icon>
      <PlusCircleOutlined />
    </template>Add</a-button>

  <a-table bordered :data-source="dataSource" :columns="columns" :pagination=false>
    <template v-for="col in ['key', 'name', 'keycode']" #[col]="{ text, record }" :key="col">
      <div class="editable-cell">
        <a-input v-if="editableData[record.key]" v-model:value="editableData[record.key][col]" style="margin: -5px 0" />
        <template v-else>
          {{ text }}
        </template>
      </div>
    </template>
    <template #operation="{ record }">
      <a-popconfirm v-if="dataSource.length" title="Sure to delete?" @confirm="onDelete(record.key)">
        <a>Delete</a>
      </a-popconfirm>
      <div class="editable-row-operations">
        <span v-if="editableData[record.key]">
          <a-button type="primary" @click="save(record.key)">Save</a-button>
          <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
            <a-button>Cancel</a-button>
          </a-popconfirm>
        </span>
        <span v-else>
          <a @click="edit(record.key)">Edit</a>
        </span>
      </div>
    </template>
  </a-table>
  <a-button type="primary" class="editable-add-btn" @click="handleAdd" style="margin-bottom: 8px"> <template #icon>
      <PlusCircleOutlined />
    </template>Add</a-button>
</template>
<script>
import { computed, defineComponent,reactive,  ref, toRef, onMounted, onUpdated, onActivated } from 'vue';
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue';
import { cloneDeep,isEqual } from 'lodash-es';
export default defineComponent({
  components: {
    CheckOutlined,
    EditOutlined,
  },
  props: {
    commands: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["updateCommands"],
  watch: {
    commands: {
      handler(val,val2) {
        // debugger
        this.dataSource = cloneDeep(val);
        console.log("parentcommands----", val,val2);
      },
      immediate: true,
      deep: true,
    },
    dataSource: {
      handler(newVal,oldVal) {
        if(isEqual(newVal,oldVal))return;
        // debugger
        try {
          this.$emit("updateCommands",cloneDeep(newVal) );
          this.count = newVal.length;
        } catch (error) {
          console.log(error)
        }

        console.log(newVal, this.count)
      },
      immediate: true,
      deep: true,
      flush: 'post'
    },
  },
  setup(props) {
    // debugger
    const columns = [
      {
        title: 'name',
        dataIndex: 'name',
        slots: { customRender: 'name' },
      },
      {
        title: 'keycode',
        dataIndex: 'keycode',
        slots: {
          customRender: 'keycode',
        },
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        slots: {
          customRender: 'operation',
        },
      },

    ];


    let dataSource = ref(props.commands);
   


    // console.log("dataSource",dataSource.value)
    const count = computed(() => dataSource.value.length + 1);
    const editableData = reactive({});
    const edit = key => {
      editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
    };
    const save = key => {
      let _dataSource = cloneDeep(dataSource.value)
      Object.assign(_dataSource.filter(item => key === item.key)[0], editableData[key]);
      delete editableData[key];
    
      dataSource.value = _dataSource;

    };
    const onDelete = key => {
      let _dataSource = cloneDeep(dataSource.value)
      _dataSource =  _dataSource.filter(item => item.key !== key)
      dataSource.value = _dataSource
    };
    const cancel = key => {
      delete editableData[key];
    };
    const handleAdd = () => {
      const newData = {
        key: `${count.value}`,
        name: `${count.value}`,
        keycode: `${count.value}`,
      };
      let _dataSource = cloneDeep(dataSource.value)
      _dataSource.push(newData)
      dataSource.value = _dataSource
    };
    return {
      columns,
      onDelete,
      handleAdd,
      dataSource,
      editableData,
      count,
      cancel,
      edit,
      save,
    };
  },
});
</script>
<style lang="less">
.editable-cell {
  position: relative;

  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>