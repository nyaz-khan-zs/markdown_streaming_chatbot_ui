'use client';

import { useState, useEffect, useCallback } from 'react';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup';

import { paths } from 'src/routes/paths';

import { fShortenNumber } from 'src/utils/format-number';

import { POST_PUBLISH_OPTIONS } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Markdown } from 'src/components/markdown';

import { PostDetailsHero } from '../post-details-hero';
import { PostCommentList } from '../post-comment-list';
import { PostCommentForm } from '../post-comment-form';
import { PostDetailsToolbar } from '../post-details-toolbar';

// ----------------------------------------------------------------------

export function SummaryDetailsView({ summary }) {
  const [publish, setPublish] = useState('publish');

  const handleChangePublish = useCallback((newValue) => {
    setPublish(newValue);
  }, []);

  useEffect(() => {
    if (summary) {
      setPublish('publish');
    }
  }, [summary]);

  return (
    <DashboardContent>
      <Container maxWidth={false} sx={{ px: { sm: 5 } }}>
        <PostDetailsToolbar
          backLink={paths.dashboard.post.root}
          publish={`${publish}`}
          onChangePublish={handleChangePublish}
          publishOptions={POST_PUBLISH_OPTIONS}
        />
      </Container>
      <Stack
        sx={{
          pb: 5,
          mx: 'auto',
          maxWidth: 720,
          mt: { xs: 5, md: 10 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Stack direction="row" sx={{ mb: 3, mt: 5 }}>
          <Typography variant="h4">Comments</Typography>

          <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
            ({summary?.comments.length})
          </Typography>
        </Stack>

        <PostCommentForm />

        <Divider sx={{ mt: 5, mb: 2 }} />

        <PostCommentList comments={summary?.comments ?? []} />
      </Stack>
    </DashboardContent>
  );
}
