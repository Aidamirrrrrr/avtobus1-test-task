import styles from './groups-list.module.scss';

import { GroupItem } from '@/features/group/ui/group-item';

import type { GroupsListProps } from './groups-list-types';

export const GroupsList = ({ groupItems }: GroupsListProps) => {
    return (
        <ul class={styles.groupsList}>
            {groupItems.map((group) => (
                <li>
                    <GroupItem value={group.value} />
                </li>
            ))}
        </ul>
    );
};
