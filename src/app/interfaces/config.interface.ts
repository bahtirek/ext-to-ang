import { JiraSettings } from "./jira-settings.interface";

export interface Config {  
    userEmail: string,
    registrationKey: string,
    client?: string,
    isAdmin?: number,
    repositoryServer?: string,
    token?: string,
    uuid?: string,
    userProfileId?: number,
    userAppId?: string,
    jiraSettings?: JiraSettings    
}