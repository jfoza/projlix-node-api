CREATE OR REPLACE FUNCTION user_conf.get_user_rules(user_id UUID)
    RETURNS TABLE (
                      id UUID,
                      description VARCHAR,
                      subject VARCHAR,
                      action VARCHAR,
                      profile_active BOOLEAN,
                      rule_active BOOLEAN
                  ) AS $$
BEGIN
    RETURN QUERY
        SELECT DISTINCT
            ur.id,
            ur.description,
            ur.subject,
            ur.action,
            up.active AS profile_active,
            ur.active AS rule_active
        FROM user_conf.rules ur
                 JOIN user_conf.profiles_rules upr ON ur.id = upr.rule_id
                 JOIN user_conf.profiles up ON upr.profile_id = up.id
                 JOIN user_conf.users uu ON up.id = uu.profile_id
        WHERE uu.id = user_id
          AND ur.active = true
          AND up.active = true
        GROUP BY ur.id, up.active;
END;
$$ LANGUAGE plpgsql;