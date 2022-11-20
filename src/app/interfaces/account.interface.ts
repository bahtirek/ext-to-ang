import { JiraSettings } from "./jira-settings.interface";

export interface Account {  
    userEmail: string,
    registrationKey: string,
    userAppId: string,
    client?: string,
    isAdmin?: number,
    repositoryServer?: string,
    token?: string,
    uuid?: string,
    userProfileId?: number,
    jiraSettings?: JiraSettings    
}