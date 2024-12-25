'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_master', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      linked_account_id: {
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING(100)
      },
      people_name: {
        type: Sequelize.STRING(100)
      },
      email: {
        type: Sequelize.STRING(256)
      },
      email_verified_at: {
        type: Sequelize.DATE
      },
      password: {
        type: Sequelize.STRING(256)
      },
      remember_token: {
        type: Sequelize.STRING(256)
      },
      reset_password_token: {
        type: Sequelize.STRING(256)
      },
      birth_date: {
        type: Sequelize.DATEONLY
      },
      gender: {
        type: Sequelize.ENUM('male', 'female')
      },
      phonecode: {
        type: Sequelize.STRING(20)
      },
      phone: {
        type: Sequelize.STRING(100)
      },
      otp_code: {
        type: Sequelize.STRING(50)
      },
      is_otp_verified: {
        type: Sequelize.BOOLEAN
      },
      phone_verified_at: {
        type: Sequelize.DATE
      },
      user_location: {
        type: Sequelize.STRING(100)
      },
      about: {
        type: Sequelize.TEXT
      },
      photo: {
        type: Sequelize.STRING(256)
      },
      fav_countries: {
        type: Sequelize.STRING(256)
      },
      fav_categories: {
        type: Sequelize.STRING(256)
      },
      language_id: {
        type: Sequelize.INTEGER
      },
      currency_id: {
        type: Sequelize.INTEGER
      },
      stripe_customer_id: {
        type: Sequelize.STRING(256)
      },
      stripe_account_id: {
        type: Sequelize.STRING(256)
      },
      stripe_account_country: {
        type: Sequelize.INTEGER
      },
      socket_id: {
        type: Sequelize.STRING(256)
      },
      online: {
        type: Sequelize.STRING(1),
        defaultValue: 'N'
      },
      register_type: {
        type: Sequelize.ENUM('email', 'facebook', 'twitter', 'google'),
        defaultValue:'email'
      },
      provider_user_id: {
        type: Sequelize.STRING(256)
      },
      provider: {
        type: Sequelize.ENUM('facebook', 'twitter', 'google')
      },
      receive_notification: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
      },
      refer_code_friend: {
        type: Sequelize.STRING(100)
      },
      refer_code_organizer: {
        type: Sequelize.STRING(100)
      },
      refer_friend_count: {
        type: Sequelize.INTEGER
      },
      refer_friend_earrings: {
        type: Sequelize.INTEGER
      },
      refer_experience_earrings: {
        type: Sequelize.INTEGER
      },
      register_reference: {
        type: Sequelize.INTEGER
      },
      register_reference_type: {
        type: Sequelize.ENUM('friend', 'experience')
      },
      role: {
        type: Sequelize.ENUM('1', '2', '3'),
        defaultValue:'1',
        Comment:"1 user | 2 organizer | 3 Admin"
      },
      is_office: {
        type: Sequelize.ENUM('0', '1'),
        defaultValue:'0'
      },
      is_tracker: {
        type: Sequelize.ENUM('0', '1'),
        defaultValue:'0'
      },
      is_verified: {
        type: Sequelize.ENUM('yes', 'no'),
        defaultValue:'no'
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue:'active'
      },
      first_time_login: {
        type: Sequelize.ENUM('true', 'false'),
        defaultValue:'true'
      },
      last_time_connect: {
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE
      },
      kyc_verified: {
        type: Sequelize.BOOLEAN
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_master');
  }
};