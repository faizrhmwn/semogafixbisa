import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  BookOpen, 
  Globe, 
  Landmark, 
  User, 
  MessageSquare 
} from 'lucide-react';
import { allNewsData } from '../../data/dummyNews';
import '../../styles/notifications.css';

const NotificationPages = () => {
  const navigate = useNavigate();

  // Helper function to get icon based on category
  const getIcon = (category) => {
    const iconMap = {
      ENVIRONMENT: BookOpen,
      TECHNOLOGY: Globe,
      POLITICS: Landmark,
      SOCIAL: User,
    };
    return iconMap[category] || BookOpen;
  };

  // Convert dummy news to notifications with colors and icons
  const notifications = allNewsData.slice(0, 5).map((news, index) => ({
    ...news,
    icon: getIcon(news.category),
    time: index < 2 ? (index === 0 ? "5 Menit yang lalu" : "1 Jam yang lalu") : (index === 2 ? "Kemarin" : index === 3 ? "2 Hari yang lalu" : "2 Hari yang lalu"),
    unread: index < 2,
    bgClass: ['bg-red-light', 'bg-yellow-light', 'bg-green-light', 'bg-blue-light', 'bg-purple-light'][index]
  }));

  // Split into today, this week, and comment
  const todayNotifications = notifications.slice(0, 2);
  const weekNotifications = notifications.slice(2, 4);
  const commentNotification = notifications[4];

  return (
    <div className="notifications-page-container">
      {/* Header */}
      <div className="notifications-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ChevronLeft size={32} />
        </button>
        <div className="notifications-title-container">
          <h1>Notifications</h1>
          <span className="notifications-badge">+2</span>
        </div>
      </div>

      {/* Hari Ini Section */}
      <div className="notifications-section">
        <div className="notifications-section-title">HARI INI</div>
        
        {todayNotifications.map((notification) => {
          const IconComponent = notification.icon;
          return (
            <Link key={notification.id} to={`/news/${notification.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className={`notification-item ${notification.unread ? 'unread' : ''}`}>
                <div className={`notification-icon-wrapper ${notification.bgClass}`}>
                  <IconComponent size={24} />
                </div>
                <div className="notification-content">
                  <h4>{notification.title}</h4>
                  <p>{notification.excerpt}</p>
                </div>
                <div className="notification-time">{notification.time}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Minggu Ini Section */}
      <div className="notifications-section">
        <div className="notifications-section-title">MINGGU INI</div>
        
        {weekNotifications.map((notification) => {
          const IconComponent = notification.icon;
          return (
            <Link key={notification.id} to={`/news/${notification.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className={`notification-item ${notification.unread ? 'unread' : ''}`}>
                <div className={`notification-icon-wrapper ${notification.bgClass}`}>
                  <IconComponent size={24} />
                </div>
                <div className="notification-content">
                  <h4>{notification.title}</h4>
                  <p>{notification.excerpt}</p>
                </div>
                <div className="notification-time">{notification.time}</div>
              </div>
            </Link>
          );
        })}

        <Link to={`/news/${commentNotification.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="notification-item">
            <div className="notification-icon-wrapper bg-purple-light">
              <MessageSquare size={24} />
            </div>
            <div className="notification-content">
              <h4>Komentar Baru : {commentNotification.title}</h4>
              <p>{commentNotification.excerpt}</p>
            </div>
            <div className="notification-time">{commentNotification.time}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NotificationPages;
