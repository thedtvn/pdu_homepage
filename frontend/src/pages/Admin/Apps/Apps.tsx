import { AlertDialog } from '@base-ui-components/react/alert-dialog';
import { Dialog } from '@base-ui-components/react/dialog';
import { useState } from 'react';
import { Button, Input, Text } from '@chakra-ui/react';
import styles from './../../../styles/apps.module.css';


export default function Apps() {
    function dialog() {
        const [dialogOpen, setDialogOpen] = useState(false);
        const [confirmationOpen, setConfirmationOpen] = useState(false);
        const [textareaValue, setTextareaValue] = useState('');

        return (
            <Dialog.Root
                open={dialogOpen}
                onOpenChange={(open) => {
                    // Show the close confirmation if there’s text in the textarea
                    if (!open && textareaValue) {
                        setConfirmationOpen(true);
                    } else {
                        // Reset the text area value
                        setTextareaValue('');
                        // Open or close the dialog normally
                        setDialogOpen(open);
                    }
                }}
            >
                <Dialog.Trigger >
                    <Text>
                        New AppApp
                    </Text>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Backdrop className={styles.Backdrop} />
                    <Dialog.Popup className={styles.Popup}>
                        <Dialog.Title className={styles.Title}>New Apps</Dialog.Title>
                        <Dialog.Description className={styles.Description}>
                            Create a new app
                        </Dialog.Description>
                        <Input type='text' m={3} placeholder='App Name' className={styles.Input} />
                        <Input type='text' m={3} placeholder='App Redirect URI' className={styles.Input} />
                        <Button onClick={() => setDialogOpen(false)} className={styles.CloseButton}>
                            Close
                        </Button>
                        <Button ml={3} onClick={() => setDialogOpen(false)} className={styles.CloseButton}>
                            Save
                        </Button>
                    </Dialog.Popup>
                </Dialog.Portal>
            </Dialog.Root>
        );
    }
    return (
        <div>
            {dialog()}
        </div>
    )
}