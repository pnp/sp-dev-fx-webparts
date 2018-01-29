
import { IUserProfileService } from './IUserProfileService';
import { 
    IPerson, 
    IUserProfileProperty 
} from '../../index';

export class MockUserProfileService implements IUserProfileService {
    private _users:IPerson[];
    private _userProperties: IUserProfileProperty[];   

    public constructor() {
        let result: IUserProfileProperty = {};
       
        this._userProperties = [
            {
                Key: 'WorkPhone',
                Value: '+46123456',
                ValueType: 'String'
            },
            {
                Key: 'CellPhone',
                Value: '+46123456',
                ValueType: 'String'
            },
            {
                Key: 'HomePhone',
                Value: '+46123456',
                ValueType: 'String'
            },
            {
                Key: 'Department',
                Value: 'IT Department',
                ValueType: 'String'
            }
        ];            
        
        this._userProperties.map((property) =>{
            result[property.Key] = property.Value;                  
         });

        this._users = [
                {
                    AccountName:'i:0#.f|membership|user1@microsoft.com',
                    DisplayName:'User One',
                    Title:'Manager',
                    UserUrl:'',
                    PictureUrl:'',
                    DirectReports:[
                        'i:0#.f|membership|user3@microsoft.com',                       
                        'i:0#.f|membership|user4@microsoft.com',
                        'i:0#.f|membership|user5@microsoft.com',  
                    ],
                    ExtendedManagers:[
                        'i:0#.f|membership|user2@microsoft.com'
                    ],
                    Email:'user1@microsoft.com',
                    UserProfileProperties:this._userProperties,
                    Properties:result                               
                },
                {                   
                    AccountName:'i:0#.f|membership|user2@microsoft.com',
                    DisplayName:'User Two',
                    Title:'CEO',
                    UserUrl:'',
                    PictureUrl:'',
                    DirectReports:[
                        'i:0#.f|membership|user1@microsoft.com',                        
                    ],
                    ExtendedManagers:[],
                    Email:'user2@microsoft.com',
                    UserProfileProperties:this._userProperties,
                    Properties:result    
                },
                {
                    AccountName:'i:0#.f|membership|user3@microsoft.com',
                    DisplayName:'User Three',
                    Title:'Employee',
                    UserUrl:'',
                    PictureUrl:'',
                    DirectReports:[],
                    ExtendedManagers:[
                        'i:0#.f|membership|user1@microsoft.com'
                    ],
                    Email:'user3@microsoft.com',
                    UserProfileProperties:this._userProperties,
                    Properties:result     
                },
                {                   
                    AccountName:'i:0#.f|membership|user4@microsoft.com',
                    DisplayName:'User Four',
                    Title:'Employee',
                    UserUrl:'',
                    PictureUrl:'',
                    DirectReports:[],
                    ExtendedManagers:[
                        'i:0#.f|membership|user1@microsoft.com'
                    ],
                    Email:'user4@microsoft.com',
                    UserProfileProperties:this._userProperties,
                    Properties:result                    
                },
                {                   
                    AccountName:'i:0#.f|membership|user5@microsoft.com',
                    DisplayName:'User Five',
                    Title:'Employee',
                    UserUrl:'',
                    PictureUrl:'',
                    DirectReports:[],
                    ExtendedManagers:[
                        'i:0#.f|membership|user1@microsoft.com'
                    ],
                    Email:'user5@microsoft.com',
                    UserProfileProperties:this._userProperties,
                    Properties:result                                           
                },                                   
            ];
    }
    public async getPropertiesForUsers(userLoginNames: string[]): Promise<IPerson[]>{
       
        const p1 = new Promise<IPerson[]>((resolve, reject) => {
            let users: IPerson[] = [];

            userLoginNames.map((login:string) =>{            
                this._users.filter((user:IPerson) =>{
                    if(user.AccountName === login){
                        users.push(user);
                    }
                });
            });

            setTimeout(() => {
                resolve(users);
            }, 1000);
        });        

        return p1;
    }
}