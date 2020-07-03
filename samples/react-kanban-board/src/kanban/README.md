# KanbanComponent Control

This control renders a KanbanBoard  which can be used to show Tasks and move it from one State to an Other.   

**Control in Action**

![KanbanBoard control](../../assets/kanbanofficeUI.gif)


## How to use this control in your solutions

 this component is not Extracted as an NPM Package 
 Copy this Folder 
In the Files ```MockKanban.tsx``` you can find many Configuration Options


```typescript
 <KanbanComponent
    buckets={buckets}
    tasks={tasks}
    tasksettings={{
        showPriority: true,
        showAssignedTo: true,
        showTaskDetailsButton: true
    }
    }
    taskactions={{
        toggleCompleted: this._toggleCompleted.bind(this),
        allowMove: this._allowMove.bind(this),
        moved: this._moved.bind(this),
    }}
    showCommandbar={true}
/>

```
Buckets
```
[
{bucket:'Not Started', bucketheadline:'Not Started Head',percentageComplete:0, color:'yellow' ,allowAddTask:true},
{bucket:'Test1', bucketheadline:'Test1 Head',percentageComplete:10, color:'orange',allowAddTask:true },
{bucket:'Test2', bucketheadline:'Test2 Head',percentageComplete:50, color:'green' },
]

```

Tasks
```
[
{taskId: '1', title:'test1',bucket:'Not Started'},
{taskId: '5', title:'test 5',bucket:'Test3'}
]
```


## Implementation

The KanbanBoard control can be configured with the following properties:

### IKanbanBucket
| Property           | Type   | Required | Description                                      | Default                 |
| ------------------ | ------ | -------- | ------------------------------------------------ | ----------------------- |
| bucket             | string | *        | internalname                                     |                         |
| bucketheadline     | string |          | Optional Headline                                | name of property bucket |
| percentageComplete | number |          | Percentage of Bucket shows in bar under Headline |
| color              | string |          |                                                  |                         |

### IKanbanTask
| Property          | Type                    | Required | Description | Default |
| ----------------- | ----------------------- | -------- | ----------- | ------- |
| taskId            | string                  | *        |             |         |
| title             | string                  | *        |             |         |
| assignedTo        | IPersonaProps           |          |             |         |
| htmlDescription   | string                  |          |             |         |
| priority          | string                  |          |             |         |
| bucket            | string                  | *        |             |         |
| mamagedProperties | IKanbanTaskManagedProps |          |             |         |
    

### IKanbanComponentProps

| Property       | Type                     | Required | Description | Default |
| -------------- | ------------------------ | -------- | ----------- | ------- |
| buckets        | IKanbanBucket[]          | *        |             |         |
| tasks          | IKanbanTask[]            | *        |             |         |
| tasksettings   | IKanbanBoardTaskSettings | *        |             |         |
| taskactions    | IKanbanBoardTaskActions  | *        |             |         |
| showCommandbar | boolean                  |          |             | false   |
| renderers      | IKanbanBoardRenderers    |          |             |         |
| allowAdd?      | boolean                  |          |             | false   |

    
#### IKanbanBoardTaskSettings
| Property              | Type    | Required | Description | Default |
| --------------------- | ------- | -------- | ----------- | ------- |
| showPriority          | boolean | *        |             |         |
| showAssignedTo        | boolean | *        |             |         |
| showTaskDetailsButton | boolean | *        |             |         |
#### IKanbanBoardTaskActions
| Property        | Type                                                                                | Required | Description | Default |
| --------------- | ----------------------------------------------------------------------------------- | -------- | ----------- | ------- |
| toggleCompleted | (taskId:  string) => void                                                           |          |             |         |
| allowMove       | taskId:  string, prevBucket: IKanbanBucket, targetBucket: IKanbanBucket) => boolean |          |             |         |
| moved           | (taskId:  string,  targetBucket: IKanbanBucket) => void;                            |          |             |         |


#### IKanbanBoardRenderers 
| Property        | Type                                  | Required | Description | Default |
| --------------- | ------------------------------------- | -------- | ----------- | ------- |
| task?           | (task:IKanbanTask) => JSX.Element     |          |             |         |
| bucketHeadline? | (bucket:IKanbanBucket) => JSX.Element |          |             |         |
| taskDetail?     | (task:IKanbanTask) => JSX.Element     |          |             |

#### IKanbanTaskManagedProps
| Property    | Type                                                                              | Required | Description | Default |
| ----------- | --------------------------------------------------------------------------------- | -------- | ----------- | ------- |
| name        | string                                                                            | *        |             |         |
| displayName | string                                                                            |          |             |         |
| type:       | KanbanTaskMamagedPropertyType                                                     | *        |             |         |
| value       | string /number/ IPersonaProps/ IPersonaProps[] / any                              | *        |             |         |
| renderer    | (name: string, value: object, type: KanbanTaskMamagedPropertyType) => JSX.Element |          |             |         |

IPersonaProps reference to Office UI Fabric


#### KanbanTaskMamagedPropertyType 
| Type    | Value | Description                                 |
| ------- | ----- | ------------------------------------------- |
| string  | 1     | value                                       |
| number  | 2     | value                                       |
| percent | 3     | value * 100 %                               |
| html    | 4     | value with html string                      |
| person  | 5     | Office Ui Persona   (value:IPersonaProps)   |
| persons | 6     | Office Ui Persona's (value:IPersonaProps[]) |
| complex | 7     | JSON.stringify(value)                       |
}

## Samples

### Custom Detail View Renderer

```typescript
renderers.taskDetail?: (task:IKanbanTask) => JSX.Element ;
```

```typescript
renderers.taskDetail?: (task:IKanbanTask) => JSX.Element ;
private _taskDetailRenderer(task:IKanbanTask): JSX.Element {
    return (<div>My Cool Content!!!</div>)
}
```

### Use SharePoint New and Edit Form 

´´´typescript
taskactions.taskEdit?: (task: IKanbanTask) => void ;
taskactions.taskAdd?: (bucket?: IKanbanBucket) => void ;
´´´
Open in Dialog (Iframe) or new Tab (NewForm.aspx od EditForm.aspx) or make your custom Form

```typescript
private _taskAdd(bucket?: IKanbanBucket): void {
    window.open(this.listurl+'/NewForm.aspx)
}
private _taskEditd(task: IKanbanTask): void {
    window.open(this.listurl+'/EditFrom.aspx?ID='+task.taskId')
}

```


### Disallow Move from One Bucket to an Other (allowMove)

´´´typescript
taskactions.allowMove: (taskId: string, prevBucket: IKanbanBucket, targetBucket: IKanbanBucket) => boolean;
```

```typescript
private _allowMove(taskId: string, prevBucket: IKanbanBucket, targetBucket: IKanbanBucket): boolean {
    if (prevBucket.bucket === 'Test2' && targetBucket.bucket === 'Test3') {
        return false;
    }
    return true;
}
```

## Leanings

Read more about [Drag and Drop](https://petkir.wordpress.com/2020/07/01/drag-and-drop-in-react-spfx/)
```
IKanbanTask {
    taskId:  string;
}
```
has to be a string because, i use event ```event.dataTransfer.setData``` and this accespts only strings in IE
```
event.dataTransfer.setData('text',1)
Invalid argument.
```
The second big thing is IE allows only to set the value 'text' event.dataTransfer.setData('text','1')
```
event.dataTransfer.setData('xyz','1')
Unexpected call to method or property access.
```

-------------------------------
## Future

* think about Promise Task Actions, because actions are  async
* EditSchema To support Edit
