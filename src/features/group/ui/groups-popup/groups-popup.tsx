import styles from './groups-popup.module.scss';

import type { GroupItemProps } from '@/features/group/ui/group-item';
import { GroupsList } from '@/features/group/ui/groups-list';
import { Button } from '@/shared/ui/button';
import { Popup } from '@/shared/ui/popup';

const groupItems: GroupItemProps[] = [{ value: 'Друзья' }, { value: 'Коллеги' }, { value: 'Родственники' }];

export const GroupsPopup = () => {
    const isOpen = false;

    return (
        <Popup
            title="Группы контактов"
            isOpen={isOpen}
            footerContent={
                <div class={styles.groupsPopup__footer}>
                    <Button variant="ghost">Добавить</Button>
                    <Button>Сохранить</Button>
                </div>
            }
            onClose={() => console.log('Closed')}
        >
            <GroupsList groupItems={groupItems} />
        </Popup>
    );
};
