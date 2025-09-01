from rest_framework import permissions

class IsOwnerOrReadOnlyOrCreate(permissions.BasePermission):
    """
    - Anyone can read (safe methods).
    - Authenticated users can create.
    - Only the owner can edit/delete.
    """

    def has_permission(self, request, view):
        # Allow safe methods (GET, HEAD, OPTIONS) for everyone
        if request.method in permissions.SAFE_METHODS:
            return True

        # Allow create (POST) only for authenticated users
        if request.method == "POST":
            return request.user and request.user.is_authenticated

        # For update/delete, defer to has_object_permission
        return True

    def has_object_permission(self, request, view, obj):
        # Safe methods: allow anyone
        if request.method in permissions.SAFE_METHODS:
            return True

        # Only the owner can update/delete
        return obj.author == request.user


'''
class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of a post to edit it.
    """
    
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Write permissions are only allowed to the owner of the post.
        return obj.author == request.user
    '''