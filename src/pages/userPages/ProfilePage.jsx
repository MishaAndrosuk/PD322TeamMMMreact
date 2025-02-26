import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { Container, Typography, Avatar, Button, Box, Paper, Divider, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { APP_ENV } from "../../env";
import { useAction } from "../../hooks/useAction";
import { useTranslation } from 'react-i18next';

const ProfilePage = () => {
    const { delete_user } = useAction();
    const user = useSelector((state) => state.userReducer.user);
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();


    const handleDeleteAccount = async () => {
        await delete_user();
        setOpenDialog(false);
        navigate("/");
    };

    const handleCancel = () => {
        setOpenDialog(false);
    };

    return (
        <Container sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: 500, width: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Avatar
                        src={`${APP_ENV.REMOTE_HOST_NAME}${user?.avatar}`}
                        alt="Avatar"
                        sx={{ width: 120, height: 120, mb: 2 }}
                    />
                    <Typography variant="h5" fontWeight={600}>
                        {user?.first_name} {user?.last_name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {user?.email}
                    </Typography>

                    <Divider sx={{ width: '100%', my: 2 }} />

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => navigate("/user/profile/edit")}
                        sx={{ borderRadius: 2, textTransform: 'none', fontSize: '1rem' }}
                    >
                       {t("profilePage.editProfile")}
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        onClick={() => setOpenDialog(true)}
                        sx={{ borderRadius: 2, textTransform: 'none', fontSize: '1rem' }}
                    >
                        {t("profilePage.deleteAccount")}
                    </Button>
                </Box>
            </Paper>

            <Dialog open={openDialog} onClose={handleCancel}>
                <DialogTitle>{t('profilePage.confirmDeleteModal.confirmDelete')}</DialogTitle>
                <DialogContent>
                    <Typography>{t('profilePage.confirmDeleteModal.youSure')}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                    {t('profilePage.confirmDeleteModal.cancelButton')}
                    </Button>
                    <Button onClick={handleDeleteAccount} color="error">
                    {t('profilePage.confirmDeleteModal.deleteButton')}
                    </Button>
                </DialogActions>
            </Dialog>

        </Container>
    );
};

export default ProfilePage;
