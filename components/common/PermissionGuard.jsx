"use client";

import { useSelector } from "react-redux";

const PermissionGuard = ({
    permissions = [],
    fallback = null,
    children,
}) => {
    const userPermissions = useSelector((state) => state?.user?.permissions) || [];

    if (!permissions || permissions.length === 0) return children;

    const permissionValues = userPermissions.map((p) =>
        typeof p === "string" ? p : p.value
    );
    const hasAllPermissions = permissions.every((p) => permissionValues.includes(p));

    return hasAllPermissions ? children : fallback;
};

export default PermissionGuard;
