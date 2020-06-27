
# Next Steps Component:
* think about Promise Task Actions, because actions are async
* EditSchema To support Edit
-------------------------------
# KanbanComponent Control

This control renders a KanbanBoard  which can be used to show Tasks and move it from one State to an Other.   

**Control in Action**

![KanbanBoard control](../assets/KanbanBoard.gif)


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
Bucket
```
  buckets:[
                {bucket:'Not Started', bucketheadline:'Not Started Head',percentageComplete:0, color:'yellow' ,allowAddTask:true},
                {bucket:'Test1', bucketheadline:'Test1 Head',percentageComplete:10, color:'orange',allowAddTask:true },
                {bucket:'Test2', bucketheadline:'Test2 Head',percentageComplete:50, color:'green' },
                {bucket:'Test3', bucketheadline:'Test3 Head',percentageComplete:50, color:'#FF0000' },
                {bucket:'Test4', bucketheadline:'Test4 Head',percentageComplete:0 ,allowAddTask:true }
            ],

```

Task
```
{taskId: 1, title:'test1',bucket:'Not Started'},
{taskId: 2, title:'test2',bucket:'Not Started'},
{taskId: 3, title:'test3',bucket:'Not Started'},
{taskId: '4', title:'test 4',bucket:'Test4'},
{taskId: '5', title:'test 5',bucket:'Test3'},
```


## Implementation

The KanbanBoard control can be configured with the following properties:

### IKanbanBucket
| Property | Type | Required | Description | Default |
| ---- | ---- | ---- | ---- | ---- |

 bucket:string;
    bucketheadline:string;
    percentageComplete: number;
    color?:string;
    allowAddTask?:boolean;
### IKanbanTask
| Property | Type | Required | Description | Default |
| ---- | ---- | ---- | ---- | ---- |
  taskId: string;
    title: string;
    isCompleted?: boolean;
    assignedTo?: IPersonaProps;
    htmlDescription?:string;
    priority?:string;
    bucket: string;
    mamagedProperties?: IKanbanTaskManagedProps[];

### IKanbanComponentProps

| Property | Type | Required | Description | Default |
| ---- | ---- | ---- | ---- | ---- |


    
#### IKanbanBoardTaskSettings
| Property | Type | Required | Description | Default |
| ---- | ---- | ---- | ---- | ---- |
#### IKanbanBoardTaskActions
| Property | Type | Required | Description | Default |
| ---- | ---- | ---- | ---- | ---- |
#### IKanbanBoardRenderers 
| Property | Type | Required | Description | Default |
| ---- | ---- | ---- | ---- | ---- |
#### IKanbanTaskManagedProps
| Property | Type | Required | Description | Default |
| ---- | ---- | ---- | ---- | ---- |

IPersonaProps reference to Fluent UI

## Samples

### Custom Detail View Renderer
```typescript

```

### Use SharePoint New and Edit Form 
this is the Classic Form on the ListItems
```typescript

```

### Use EditSchema to Configure New and Edit Form in this Component
 this functionality supports only some Field Types
```typescript

```

### Disallow Move from One Bucket to an Other
 this functionality supports only some Field Types
```typescript

```

## Leanings
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