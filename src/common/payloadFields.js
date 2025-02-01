const payloadFields = {
    LiveScan:
        'scan_id, event_id, record_id, scan_date, latitude, longitude, location_description, scan_type, scan_status, scanned_by, scan_results, associated_alerts, weather_conditions, traffic_conditions, equipment_type',
    LiveAlert: {
        Safety: 'record_id, type, description, status, event_id, event_date, event_location, latitude, longitude, severity_level, reported_by, report_date, casualties, injuries, evacuations, resolution_time, response_team, response_time, response_actions, affected_population, affected_infrastructure, law_enforcement_agency, law_enforcement_contact, weather_conditions, traffic_conditions',
        Weather: 'record_id, type, description, status, event_id, event_date, event_location, latitude, longitude, severity_level, temperature, humidity, wind_speed, wind_direction, precipitation, visibility, pressure, weather_conditions, reported_by, report_date, evacuations, power_outages, road_closures, damage_estimate, forecast_accuracy, resolution_time, response_team, response_time, response_actions, fire_department_name, fire_department_contact, affected_population, affected_infrastructure, alert_source, alert_issued_time, alert_expiry_time',
        Utilities: 'record_id, type, description, status, event_id, event_date, event_location, latitude, longitude, severity_level, reported_by, report_date, utility_company, utility_company_contact, affected_population, affected_infrastructure, service_disruption, duration, estimated_repair_time, outage_area, backup_services, cause, resolution_time, response_team, response_time, response_actions, impact_level, impact_financial, impact_environmental, weather_conditions',
        Disaster: 'record_id, type, disaster_type, description, status, event_id, event_date, event_location, latitude, longitude, severity_level, magnitude, depth, affected_area, duration, cause, reported_by, report_date, casualties, injuries, evacuations, damage_estimate, resolution_time, response_team, response_time, response_actions, fire_department_name, fire_department_contact, emergency_shelter_name, emergency_shelter_location, emergency_shelter_contact, affected_population, affected_infrastructure, impact_level, impact_financial, impact_environmental'

    },
};

export { payloadFields };
