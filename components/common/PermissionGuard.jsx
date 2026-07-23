"use client";

import { useSelector } from "react-redux";

const PermissionGuard = ({
    permissions = [],
    fallback = null,
    children,
}) => {
    const userPermissions = useSelector((state) => state?.user?.permissions) || [];

    if (!permissions || permissions.length === 0) return children;

    const hasAllPermissions = permissions.every((p) => userPermissions.includes(p));

    return hasAllPermissions ? children : fallback;
};

export default PermissionGuard;
