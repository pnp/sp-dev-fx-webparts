import React from 'react';
import { describe, it, beforeEach, expect } from 'vitest';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import LikesPanel from './LikesPanel';
import SampleCard from '../SampleCard/SampleCard';

function mount(node: HTMLElement, element: React.ReactElement) {
  const root = createRoot(node);
  act(() => { root.render(element); });
  return () => { act(() => { root.unmount(); }); };
}

describe('LikesPanel messages', () => {
  beforeEach(() => {
    localStorage.clear();
    // jsdom doesn't implement matchMedia; mock minimal implementation
    // that the components expect.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (typeof window.matchMedia !== 'function') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.matchMedia = (query: string) => ({
        matches: false,
        media: query,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {}
      });
    }
  });

  it('persists overrides from giscus first event and dispatches change event', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const unmount = mount(container, <LikesPanel sampleName={'sample:my-sample'} />);

    const events: Array<CustomEvent> = [];
    const handler = (ev: Event) => { events.push(ev as CustomEvent); };
    window.addEventListener('pnp:likesOverrideChanged', handler as EventListener);

    // Create a giscus payload where reactions is an object so reportedTotal sums counts
    const payload = {
      giscus: {
        discussion: {
          id: '1',
          reactions: {
            plus1: { count: 2, viewerHasReacted: true }
          }
        },
        viewer: { login: 'tester' }
      }
    };

    // Post the message and wait for override event
    const waitForEvent = new Promise<void>((resolve) => {
      const h = () => { window.removeEventListener('pnp:likesOverrideChanged', h as EventListener); resolve(); };
      window.addEventListener('pnp:likesOverrideChanged', h as EventListener);
    });
    act(() => { window.postMessage(payload, '*'); });
    await Promise.race([waitForEvent, new Promise((r) => setTimeout(r, 500))]);

    const raw = localStorage.getItem('pnp:likes:overrides');
    expect(raw).not.toBeNull();
    const arr = JSON.parse(raw as string) as Array<any>;
    const entry = arr.find((x) => x.sample === 'sample:my-sample');
    expect(entry).toBeDefined();
    expect(entry.count).toBe(2);
    expect(entry.viewerReacted).toBe(true);

    expect(events.length).toBeGreaterThan(0);

    window.removeEventListener('pnp:likesOverrideChanged', handler as EventListener);
    unmount();
    container.remove();
  });

  it('updates SampleCard UI when user likes via giscus messages', async () => {
    const sample = {
      name: 'sample:my-sample',
      title: 'My Sample',
      authors: [],
      updateDateTime: new Date().toISOString(),
      totalReactions: 0,
      userHasReactions: false
    } as any;

    const containerCard = document.createElement('div');
    const containerPanel = document.createElement('div');
    document.body.appendChild(containerCard);
    document.body.appendChild(containerPanel);

    const unmountCard = mount(containerCard, <SampleCard sample={sample} />);
    const unmountPanel = mount(containerPanel, <LikesPanel sampleName={sample.name} />);

    // initial state: no count, not active
    const likesSpan = containerCard.querySelector('.pnp-card__likes') as HTMLElement;
    const countSpan = containerCard.querySelector('.pnp-card__likes-count') as HTMLElement;
    expect(likesSpan.classList.contains('pnp-card__likes--active')).toBe(false);
    expect(countSpan.textContent?.trim() || '').toBe('');

    // Post baseline object (as provided)
    const base = {
      discussionId: 'D_kwDOA_3DA84AjkFS',
      reactionsSnapshot: {
        THUMBS_UP: { count: 0, viewerHasReacted: false },
        THUMBS_DOWN: { count: 0, viewerHasReacted: false },
        LAUGH: { count: 0, viewerHasReacted: false },
        HOORAY: { count: 0, viewerHasReacted: false },
        CONFUSED: { count: 0, viewerHasReacted: false },
        HEART: { count: 0, viewerHasReacted: false },
        ROCKET: { count: 0, viewerHasReacted: false },
        EYES: { count: 0, viewerHasReacted: false }
      },
      viewerReactedCount: 0
    };

    // Post baseline and wait
    const waitForBase = new Promise<void>((resolve) => {
      const h = () => { window.removeEventListener('pnp:likesOverrideChanged', h as EventListener); resolve(); };
      window.addEventListener('pnp:likesOverrideChanged', h as EventListener);
    });
    act(() => { window.postMessage({ giscus: base }, '*'); });
    await Promise.race([waitForBase, new Promise((r) => setTimeout(r, 500))]);

    // Now simulate the user liking the sample
    const liked = {
      discussion: {
        id: 'D_kwDOA_3DA84AjkFS',
        url: 'https://github.com/pnp/sp-dev-fx-webparts/discussions/5692',
        locked: false,
        reactions: {
          THUMBS_UP: { count: 0, viewerHasReacted: false },
          THUMBS_DOWN: { count: 0, viewerHasReacted: false },
          LAUGH: { count: 0, viewerHasReacted: false },
          HOORAY: { count: 0, viewerHasReacted: false },
          CONFUSED: { count: 0, viewerHasReacted: false },
          HEART: { count: 1, viewerHasReacted: true },
          ROCKET: { count: 0, viewerHasReacted: false },
          EYES: { count: 0, viewerHasReacted: false }
        },
        repository: { nameWithOwner: 'pnp/sp-dev-fx-webparts' },
        reactionCount: 1,
        totalCommentCount: 0,
        totalReplyCount: 0
      },
      viewer: { avatarUrl: '', login: 'hugoabernier', url: '' }
    };

    // Post liked and wait for update
    const waitForLiked = new Promise<void>((resolve) => {
      const h = () => { window.removeEventListener('pnp:likesOverrideChanged', h as EventListener); resolve(); };
      window.addEventListener('pnp:likesOverrideChanged', h as EventListener);
    });
    act(() => { window.postMessage({ giscus: liked }, '*'); });
    await Promise.race([waitForLiked, new Promise((r) => setTimeout(r, 500))]);
    // allow React to flush state updates
    await new Promise((r) => setTimeout(r, 0));

    // Assert persistence and heart active
    const rawAfter = localStorage.getItem('pnp:likes:overrides');
    const arrAfter = JSON.parse(rawAfter as string) as Array<any>;
    const entryAfter = arrAfter.find((x) => x.sample === sample.name);
    expect(entryAfter).toBeDefined();
    expect(entryAfter.count).toBe(1);

    const updatedLikesSpan = containerCard.querySelector('.pnp-card__likes') as HTMLElement;
    expect(updatedLikesSpan.classList.contains('pnp-card__likes--active')).toBe(true);

    unmountCard();
    unmountPanel();
    containerCard.remove();
    containerPanel.remove();
  });

  it('updates when user unlikes: starts liked then goes to 0', async () => {
    const sample = {
      name: 'sample:my-sample',
      title: 'My Sample',
      authors: [],
      updateDateTime: new Date().toISOString(),
      totalReactions: 1,
      userHasReactions: true
    } as any;

    const containerCard = document.createElement('div');
    const containerPanel = document.createElement('div');
    document.body.appendChild(containerCard);
    document.body.appendChild(containerPanel);

    const unmountCard = mount(containerCard, <SampleCard sample={sample} />);
    const unmountPanel = mount(containerPanel, <LikesPanel sampleName={sample.name} />);

    // initial: sample shows liked
    const likesSpan = containerCard.querySelector('.pnp-card__likes') as HTMLElement;
    expect(likesSpan.classList.contains('pnp-card__likes--active')).toBe(true);

    // Start with a liked payload (viewer reacted)
    const liked = {
      discussion: {
        id: 'D_kwDOA_3DA84AjkFS',
        url: 'https://github.com/pnp/sp-dev-fx-webparts/discussions/5692',
        locked: false,
        reactions: {
          THUMBS_UP: { count: 0, viewerHasReacted: false },
          THUMBS_DOWN: { count: 0, viewerHasReacted: false },
          LAUGH: { count: 0, viewerHasReacted: false },
          HOORAY: { count: 0, viewerHasReacted: false },
          CONFUSED: { count: 0, viewerHasReacted: false },
          HEART: { count: 1, viewerHasReacted: true },
          ROCKET: { count: 0, viewerHasReacted: false },
          EYES: { count: 0, viewerHasReacted: false }
        },
        repository: { nameWithOwner: 'pnp/sp-dev-fx-webparts' },
        reactionCount: 1,
        totalCommentCount: 0,
        totalReplyCount: 0
      },
      viewer: { avatarUrl: '', login: 'hugoabernier', url: '' }
    };

    // Post liked and wait
    const waitForLiked = new Promise<void>((resolve) => {
      const h = () => { window.removeEventListener('pnp:likesOverrideChanged', h as EventListener); resolve(); };
      window.addEventListener('pnp:likesOverrideChanged', h as EventListener);
    });
    act(() => { window.postMessage({ giscus: liked }, '*'); });
    await Promise.race([waitForLiked, new Promise((r) => setTimeout(r, 500))]);
    await new Promise((r) => setTimeout(r, 0));

    // Now simulate the user unliking (HEART count 0)
    const unliked = {
      discussion: {
        id: 'D_kwDOA_3DA84AjkFS',
        url: 'https://github.com/pnp/sp-dev-fx-webparts/discussions/5692',
        locked: false,
        reactions: {
          THUMBS_UP: { count: 0, viewerHasReacted: false },
          THUMBS_DOWN: { count: 0, viewerHasReacted: false },
          LAUGH: { count: 0, viewerHasReacted: false },
          HOORAY: { count: 0, viewerHasReacted: false },
          CONFUSED: { count: 0, viewerHasReacted: false },
          HEART: { count: 0, viewerHasReacted: false },
          ROCKET: { count: 0, viewerHasReacted: false },
          EYES: { count: 0, viewerHasReacted: false }
        },
        repository: { nameWithOwner: 'pnp/sp-dev-fx-webparts' },
        reactionCount: 0,
        totalCommentCount: 0,
        totalReplyCount: 0
      },
      viewer: { avatarUrl: '', login: 'hugoabernier', url: '' }
    };

    const waitForUnliked = new Promise<void>((resolve) => {
      const h = () => { window.removeEventListener('pnp:likesOverrideChanged', h as EventListener); resolve(); };
      window.addEventListener('pnp:likesOverrideChanged', h as EventListener);
    });
    act(() => { window.postMessage({ giscus: unliked }, '*'); });
    await Promise.race([waitForUnliked, new Promise((r) => setTimeout(r, 500))]);
    await new Promise((r) => setTimeout(r, 0));

    // Assert: localStorage override shows count 0 and UI is not active
    const rawAfter = localStorage.getItem('pnp:likes:overrides');
    const arrAfter = JSON.parse(rawAfter as string) as Array<any>;
    const entryAfter = arrAfter.find((x) => x.sample === sample.name);
    expect(entryAfter).toBeDefined();
    expect(entryAfter.count).toBe(0);

    const updatedLikesSpan = containerCard.querySelector('.pnp-card__likes') as HTMLElement;
    expect(updatedLikesSpan.classList.contains('pnp-card__likes--active')).toBe(false);

    unmountCard();
    unmountPanel();
    containerCard.remove();
    containerPanel.remove();
  });
});
