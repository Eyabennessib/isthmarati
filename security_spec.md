# Security Specification: Isthmarati

## Data Invariants
1. A ForumPost must have a valid authorId corresponding to the authenticated user.
2. A Comment must point to a valid postId.
3. User points can only be incremented by the system (or validated quiz completions).
4. Users cannot modify other users' profiles or progress.

## The "Dirty Dozen" Payloads (Denial Tests)
1. **Identity Spoofing**: Attempt to create a post with `authorId` of another user.
2. **Resource Poisoning**: Create a post with a 1MB title.
3. **Ghost Field Injection**: Add `isVerified: true` to a user profile update.
4. **State Shortcut**: Attempt to set `points` to 1,000,000 directly.
5. **Orphaned Writes**: Create a comment for a non-existent `postId`.
6. **Malicious ID**: Create a post with ID `../../../etc/passwd`.
7. **Timestamp Fraud**: Create a post with a future `createdAt` from the client.
8. **PII Leak**: Attempt to read private fields of another user's profile.
9. **Role Escalation**: Attempt to set `isAdmin: true` on own user profile.
10. **Shadow Update**: Update a post content while also trying to change the `authorId`.
11. **Mass Overwrite**: Try to update a user doc with a map that deletes required fields.
12. **Blanket List Request**: Query the entire `users` collection without filters.

## Draft Rules (DRAFT_firestore.rules)
See the draft rules file for implementation details.
