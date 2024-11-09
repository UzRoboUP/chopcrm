/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import { useQueryClient } from '@tanstack/react-query';
import { Button, message, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import Modal from '../../ui/Modal';
import { useCreateComment, useCreateStaffComment } from './useCreateComment';
import { useCreateLeadComment } from '../leads/useCreateLeadComment';
import { useCreateCompanyComment } from '../companies/useCreateCompanyComment';

function CreateCommentModal({
  pagename,
  retrieveData,
  isOpenModal,
  onCloseModal,
}) {
  const queryClient = useQueryClient();
  const [comment, setComment] = useState('');
  const currentUser = useAppSelector((state) => state.auth.user);

  const { createComment, isLoading } = useCreateComment();
  const { createStaffComment, isLoadingStaffComment } = useCreateStaffComment();
  const { createLeadComment, isLoadingLeadComment } = useCreateLeadComment();
  const { createCompanyComment, isLoadingCompanyComment } =
    useCreateCompanyComment();

  const handleSave = () => {
    //     ('manager', 'manager'),
    //     ('operator', 'operator'),
    //     ('moderator', 'moderator'),
    //     ('accountant', 'accountant'),

    let comment_purpose = '',
      to_whom = null;

    switch (pagename) {
      case 'track':
        comment_purpose = 'tracking';
        to_whom = retrieveData?.id;
        break;
      case 'stock':
        comment_purpose = 'stock';
        to_whom = retrieveData?.contract_data?.driver_data?.id;
        break;
      case 'leads':
        comment_purpose = 'leads';
        to_whom = retrieveData?.id;
        break;
      case 'report':
        comment_purpose = 'reporting';
        to_whom = retrieveData?.contract_data?.driver_data?.id;
        break;
      case 'company':
        comment_purpose = 'company';
        to_whom = retrieveData?.id;
        break;
      case 'employee':
        comment_purpose = 'contract';
        to_whom = retrieveData?.driver?.id;
        break;
      case 'operator':
        comment_purpose = 'staff';
        to_whom = retrieveData.id;
        break;
    }

    if (['moderator', 'accountant', 'operator', 'manager'].includes(pagename)) {
      createStaffComment(
        {
          comment,
          comment_purpose: 'staff',
          by_whom: currentUser?.id as string,
          to_whom: retrieveData.id,
        },
        {
          onSuccess: (data) => {
            queryClient.setQueryData(['createComment'], data);
            queryClient.invalidateQueries({ queryKey: [`staffList`] });
            message.success('Comment created successfully');
            onCloseModal();
          },
        },
      );
      return;
    }

    if (['leads'].includes(pagename)) {
      createLeadComment(
        {
          comment,
          comment_purpose: 'leads',
          by_whom: currentUser?.id as string,
          to_whom: retrieveData.id,
        },
        {
          onSuccess: (data) => {
            queryClient.setQueryData(['createComment'], data);
            queryClient.invalidateQueries({ queryKey: [`leads`] });
            message.success('Comment created successfully');
            onCloseModal();
          },
        },
      );
      return;
    }
    if (['company'].includes(pagename)) {
      createCompanyComment(
        {
          comment,
          comment_purpose: 'company',
          by_whom: currentUser?.id as string,
          to_whom: retrieveData.id,
        },
        {
          onSuccess: (data) => {
            queryClient.setQueryData(['createComment'], data);
            queryClient.invalidateQueries({ queryKey: [`companies`] });
            message.success('Comment created successfully');
            onCloseModal();
          },
        },
      );
      return;
    }

    createComment(
      {
        comment,
        comment_purpose,
        by_whom: currentUser?.id as string,
        to_whom,
      },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(['createComment'], data);
          queryClient.invalidateQueries({ queryKey: [`${pagename}s`] });
          message.success('Comment created successfully');
          onCloseModal();
        },
      },
    );
  };

  return (
    <Modal
      title="Оставить комментарий"
      width="small"
      open={isOpenModal}
      onCancel={onCloseModal}
      closeIcon={true}
    >
      <div className="mt-20">
        <div className="d-flex flex-column justify-center mb-5">
          <Typography.Title level={5}> </Typography.Title>
          <TextArea
            style={{ width: '100%', float: 'inline-end', height: 60 }}
            defaultValue={comment}
            value={comment}
            disabled={
              isLoading ||
              isLoadingStaffComment ||
              isLoadingLeadComment ||
              isLoadingCompanyComment
            }
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="mt-20 d-flex justify-center">
          <Button
            disabled={
              isLoading ||
              isLoadingStaffComment ||
              isLoadingLeadComment ||
              isLoadingCompanyComment
            }
            loading={
              isLoading ||
              isLoadingStaffComment ||
              isLoadingLeadComment ||
              isLoadingCompanyComment
            }
            onClick={handleSave}
            type="primary"
            style={{ backgroundColor: '#21529C', width: 225 }}
          >
            ОК
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default CreateCommentModal;
