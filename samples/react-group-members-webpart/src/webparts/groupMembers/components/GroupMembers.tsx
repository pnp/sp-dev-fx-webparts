import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from 'react';
import {
  Persona,
  PersonaSize,
  Spinner,
  SpinnerSize,
  PersonaInitialsColor,
  Text,
  Stack,
  StackItem,
  PrimaryButton,
  SearchBox,
  IconButton,
  ProgressIndicator,
  MessageBar,
  MessageBarType,
  Link,
  FocusZone,
  List
} from '@fluentui/react';
import { LivePersona } from "@pnp/spfx-controls-react/lib/LivePersona";
import { IGroupMembersProps, IGroup, IUser, IUsersByRole, ICurrentPages, UserPersonaProps } from '../types/interfaces';
import styles from './GroupMembers.module.scss';
import GraphProfileImage from './GraphProfileImage';


const getFallbackInitials = (displayName: string): string => {
  const names = displayName.trim().split(' ');
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  const firstLetter = names[0].charAt(0).toUpperCase();
  const lastLetter = names[names.length - 1].charAt(0).toUpperCase();
  return `${firstLetter}${lastLetter}`;
};

const UserPersona: React.FC<UserPersonaProps> = ({ user, context }) => {
  const fallbackInitials = getFallbackInitials(user.displayName);

  return (
    <Persona
      text={user.displayName}
      secondaryText={user.jobTitle || 'Member'}
      tertiaryText={user.department}
      optionalText={user.officeLocation}
      size={PersonaSize.size40}
      initialsColor={PersonaInitialsColor.blue}
      imageInitials={fallbackInitials}
      onRenderPersonaCoin={() => (
        <GraphProfileImage
          userId={user.id}
          context={context}
          fallbackInitials={fallbackInitials}
          alt={user.displayName}
          className={styles.profileImage}
        />
      )}
    />
  );
};

const GroupMembers: React.FC<IGroupMembersProps> = (props): JSX.Element => {
  const [usersByRole, setUsersByRole] = useState<IUsersByRole>({
    admin: [],
    member: [],
    visitor: []
  });
  const [filteredUsersByRole, setFilteredUsersByRole] = useState<IUsersByRole>({
    admin: [],
    member: [],
    visitor: []
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPages, setCurrentPages] = useState<ICurrentPages>({
    admin: 1,
    member: 1,
    visitor: 1
  });
  const searchTimeoutRef = useRef<number | null>(null);

  const itemsPerPage: number = props.itemsPerPage || 10;
  const sortField: string = props.sortField || 'name';
 

  // Debounced search function
  const handleSearchChange = (newValue?: string): void => {
    if (searchTimeoutRef.current) {
      window.clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = window.setTimeout(() => {
      setSearchTerm(newValue || "");
    }, 300);
  };

  const fetchGroupUsers = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError("");
    try {
      const client = await props.context.msGraphClientFactory.getClient('3');
      const userGroups = await client.api('/me/memberOf').get();
      const groups = userGroups.value.filter(
        (group: IGroup) => group['@odata.type'] === '#microsoft.graph.group'
      );
      const newUsersByRole: IUsersByRole = {
        admin: [],
        member: [],
        visitor: []
      };
      for (const group of groups) {
        for (const role of props.roles) {
          const cacheKey = `groupUsers_${role}_${group.id}`;
          const cachedData = sessionStorage.getItem(cacheKey);
          if (cachedData) {
            newUsersByRole[role as keyof IUsersByRole].push(...JSON.parse(cachedData));
            continue;
          }
          const endpoints: Record<string, string | null> = {
            admin: `/groups/${group.id}/owners`,
            member: `/groups/${group.id}/members`,
            visitor: null
          };
          const endpoint = endpoints[role];
          if (!endpoint) continue;
          try {
            const response = await client
              .api(endpoint)
              .select('id,displayName,jobTitle,mail,userPrincipalName,department,officeLocation')
              .get();
            if (response?.value) {
              newUsersByRole[role as keyof IUsersByRole].push(...response.value);
              sessionStorage.setItem(cacheKey, JSON.stringify(response.value));
            }
          } catch (roleError) {
            console.warn(`Error fetching ${role}s:`, roleError);
          }
        }
      }
      // Remove duplicate users within each role
      Object.keys(newUsersByRole).forEach((role) => {
        const typedRole = role as keyof IUsersByRole;
        newUsersByRole[typedRole] = [
          ...new Map(newUsersByRole[typedRole].map((user: IUser) => [user.id, user])).values()
        ];
      });
      // Remove duplicates across roles (priority: admin > member > visitor)
      const processedUserIds = new Set<string>();
      const rolePriority: Array<keyof IUsersByRole> = ['admin', 'member', 'visitor'];
      rolePriority.forEach(role => {
        const uniqueUsers = newUsersByRole[role].filter(user => !processedUserIds.has(user.id));
        newUsersByRole[role] = uniqueUsers;
        uniqueUsers.forEach(user => processedUserIds.add(user.id));
      });
      setUsersByRole(newUsersByRole);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error retrieving group users.";
      setError(errorMessage);
      console.error('Error in fetchGroupUsers:', error);
    } finally {
      setLoading(false);
    }
  }, [props.context, props.roles]);

  const filterAndSortUsers = useCallback((): void => {
    const newFilteredUsers: IUsersByRole = {
      admin: [],
      member: [],
      visitor: []
    };
    Object.keys(usersByRole).forEach((role) => {
      const typedRole = role as keyof IUsersByRole;
      newFilteredUsers[typedRole] = usersByRole[typedRole].filter(user =>
        user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.jobTitle?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (user.department?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (user.officeLocation?.toLowerCase() || '').includes(searchTerm.toLowerCase())
      );
      newFilteredUsers[typedRole].sort((a, b) => {
        if (sortField === 'name') {
          return a.displayName.localeCompare(b.displayName);
        }
        return (a.jobTitle || '').localeCompare(b.jobTitle || '');
      });
    });
    setFilteredUsersByRole(newFilteredUsers);
    setCurrentPages({ admin: 1, member: 1, visitor: 1 });
  }, [usersByRole, searchTerm, sortField]);

  useEffect(() => {
    if (!props.showSearchBox) {
      setSearchTerm("");
    }
  }, [props.showSearchBox]);

  useEffect(() => {
    fetchGroupUsers().catch((error: Error) => {
      console.error('Failed to fetch group users:', error);
      setError('Failed to fetch group users');
    });
  }, [fetchGroupUsers]);

  useEffect(() => {
    filterAndSortUsers();
  }, [filterAndSortUsers]);

  // --- UserSection Component ---
  const UserSection: React.FC<{ role: keyof IUsersByRole; users: IUser[] }> = ({ role, users }): JSX.Element | null => {
    const startIndex = (currentPages[role] - 1) * itemsPerPage;
    const totalPages = Math.ceil(users.length / itemsPerPage);
    const paginatedUsers = users.slice(startIndex, startIndex + itemsPerPage);
    const roleLabels: Record<string, string> = {
      admin: props.adminLabel || 'Administrators',
      member: props.memberLabel || 'Members',
      visitor: props.visitorLabel || 'Visitors'
    };
  
    return users.length > 0 ? (
      <div className={styles.userSection}>
        <Stack horizontal verticalAlign="center" className={styles.sectionHeader}>
          <Text variant="large" as="h3" className={styles.sectionTitle}>
            {roleLabels[role]} ({users.length})
          </Text>
          <StackItem grow>
            <div className={styles.sectionDivider} />
          </StackItem>
        </Stack>
        <div className={styles.userList}>
          <FocusZone>
            <List
              items={paginatedUsers}
              onRenderCell={(user: IUser | undefined): JSX.Element | null => {
                if (!user) return null;
                return (
                  <div className={styles.listItem}>
                    <LivePersona
                      upn={user.userPrincipalName}
                      serviceScope={props.context.serviceScope}
                      template={
                        <UserPersona
                          user={user}
                          context={props.context}
                          />
                      }
                    />
                    <div className={styles.listActions}>
                      <IconButton
                        iconProps={{ iconName: 'Chat' }}
                        title="Start a chat"
                        ariaLabel="Start a chat"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`https://teams.microsoft.com/l/chat/0/0?users=${user.userPrincipalName}`, '_blank');
                        }}
                      />
                      <IconButton
                        iconProps={{ iconName: 'Mail' }}
                        title="Send email"
                        ariaLabel="Send email"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `mailto:${user.mail}`;
                        }}
                      />
                    </div>
                  </div>
                );
              }}
            />
          </FocusZone>
        </div>
        {users.length > itemsPerPage && (
  <div className={styles.paginationContainer}>
    <PrimaryButton
      text="Previous"
      onClick={() => {
        setCurrentPages(prev => ({
          ...prev,
          [role]: Math.max(1, prev[role] - 1)
        }));
        
      }}
     
      disabled={currentPages[role] === 1}
      iconProps={{ iconName: 'ChevronLeft' }}
    />
    <Text variant="medium" className={styles.paginationText}>
      Page {currentPages[role]} of {totalPages}
    </Text>
    <PrimaryButton
      text="Next"
      onClick={() => {
        setCurrentPages(prev => ({
          ...prev,
          [role]: Math.min(totalPages, prev[role] + 1)
        }));
      }}
       
      disabled={currentPages[role] === totalPages}
      iconProps={{ iconName: 'ChevronRight' }}
    />
  </div>
)}
      </div>
    ) : null;
  };

  
  return (
    <div className={styles.groupMembers}>
      <Stack horizontal verticalAlign="center" className={styles.header}>
        <Text variant="xLarge" as="h2" className={styles.pageTitle}>
          Group Members
        </Text>
      </Stack>
      {props.showSearchBox && (
        <div className={styles.searchContainer}>
          <SearchBox
            placeholder="Search by name, role, department, or location..."
            onChange={(_, newValue) => handleSearchChange(newValue)}
            iconProps={{ iconName: 'Search' }}
            className={styles.searchBox}
            underlined
          />
        </div>
      )}
      {loading && (
        <div className={styles.loadingContainer}>
          <Spinner size={SpinnerSize.large} label="Loading group users..." />
          <ProgressIndicator label="Retrieving user information" description="Please wait..." />
        </div>
      )}
      {error && (
        <MessageBar
          messageBarType={MessageBarType.error}
          isMultiline={true}
          dismissButtonAriaLabel="Close"
          className={styles.errorMessage}
        >
          {error}
          <Link onClick={() => fetchGroupUsers()}>Retry</Link>
        </MessageBar>
      )}
      {!loading && !error && (
        <div className={styles.contentContainer}>
          {props.roles.map(role => (
            <UserSection
              key={role}
              role={role as keyof IUsersByRole}
              users={filteredUsersByRole[role as keyof IUsersByRole]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupMembers;