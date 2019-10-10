using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace MyTime.Models
{
  public class MTUser
  {
    private string _username;
    private string _password;
    private string _email;
    private string _sessionstartdate;
    private string _normalizedstarttime;
    private string _sessionstarttime;
    private int _userid;
    //Getters
    public string getUserName()
    {
      return _username;
    }
    public string getPassword()
    {
      return _password;
    }
    public string getEmail()
    {
      return _email;
    }
    public string getSessionStartDate()
    {
      return _sessionstartdate;
    }
    public string getNormalizedStartTime()
    {
      return _normalizedstarttime;
    }
    public string getSessionStartTime()
    {
      return _sessionstarttime;
    }
    public int getUserId()
    {
      return _userid;
    }
    //Setters
    public void setUserName(string NewUserName)
    {
      _username = NewUserName;
    }
    public void setPassword(string NewPassword)
    {
      _password = NewPassword;
    }
    public void setEmail(string NewEmail)
    {
      _email = NewEmail;
    }
    public void setSessionStartDate(string NewSessionStartDate)
    {
      _sessionstartdate = NewSessionStartDate;
    }
    public void setNormalizedStartTime(string NewNormalizedStartTime)
    {
      _normalizedstarttime = NewNormalizedStartTime;
    }
    public void setSessionStartTime(string NewSessionStartTime)
    {
      _sessionstarttime = NewSessionStartTime;
    }
    public void setUserId(int NewUserId)
    {
      _userid = NewUserId;
    }
    //Constructor
    public MTUser(string UserName, string Password, string Email, string SessionStartDate, string NormalizedStartTime, string SessionStartTime, int UserId)
    {
      _username = UserName;
      _password = Password;
      _email = Email;
      _sessionstartdate = SessionStartDate;
      _normalizedstarttime = NormalizedStartTime;
      _sessionstarttime = SessionStartTime;
      _userid = UserId;
    }
    //Methods
    public static void Save(string inputUserName, string inputPassword, string inputEmail)
    {
      MySqlConnection conn = DB.Connection();
      conn.Open();

      var cmd = conn.CreateCommand() as MySqlCommand;
      cmd.CommandText = @"INSERT INTO users(user_name, password, email, ssd, nst, sst) VALUES (@inputUser, @inputPass, @inputE, @ssd, @nst, @sst);";
      cmd.Parameters.Add(new MySqlParameter("@inputUser", inputUserName));
      cmd.Parameters.Add(new MySqlParameter("@inputPass", inputPassword));
      cmd.Parameters.Add(new MySqlParameter("@inputE", inputEmail));
      cmd.Parameters.Add(new MySqlParameter("@ssd", "0"));
      cmd.Parameters.Add(new MySqlParameter("@nst", "0"));
      cmd.Parameters.Add(new MySqlParameter("@sst", "0"));
      cmd.ExecuteNonQuery();

      conn.Close();
      if (conn != null)
      {
        conn.Dispose();
      }
    }
    public static MTUser getUserByName(string userName)
    {
      MySqlConnection conn = DB.Connection();
      conn.Open();

      var cmd = conn.CreateCommand() as MySqlCommand;
      cmd.CommandText = @"SELECT * FROM users WHERE user_name = (@input);";
      cmd.Parameters.Add(new MySqlParameter("@input", userName));


      int userId = 0;
      string foundUserName = null;
      string password = null;
      string email = null;
      string ssd = null;
      string nst = null;
      string sst = null;
      var rdr = cmd.ExecuteReader() as MySqlDataReader;
      while(rdr.Read())
      {
        userId = rdr.GetInt32(0);
        foundUserName = rdr.GetString(1);
        password = rdr.GetString(2);
        email = rdr.GetString(3);
        ssd = rdr.GetString(4);
        nst = rdr.GetString(5);
        sst = rdr.GetString(6);
      }
      MTUser foundUser = new MTUser(foundUserName, password, email, ssd, nst, sst, userId);

      conn.Close();
      if (conn != null)
      {
        conn.Dispose();
      }
      return foundUser;
    }

    public static int verifyUserLogin(string inputUserName, string inputPassword)
    {
      MySqlConnection conn = DB.Connection();
      conn.Open();

      var cmd = conn.CreateCommand() as MySqlCommand;
      cmd.CommandText = @"SELECT * FROM users WHERE user_name = (@input);";
      cmd.Parameters.Add(new MySqlParameter("@input", inputUserName));

      string userName = null;
      string password = null;
      var rdr = cmd.ExecuteReader() as MySqlDataReader;
      while(rdr.Read())
      {
        userName = rdr.GetString(1);
        password = rdr.GetString(2);
      }

      conn.Close();
      if (conn != null)
      {
        conn.Dispose();
      }
      if(userName != inputUserName)
      {
        return 1;
      }
      else if(password != inputPassword)
      {
        return 2;
      }
      else
      {
        return 3;
      }
    }
    public static void startNewSession(int userId, string sessionStartDate, string normalizedStartTime, string sessionStartTime)
    {
      MySqlConnection conn = DB.Connection();
      conn.Open();

      var cmd = conn.CreateCommand() as MySqlCommand;
      cmd.CommandText = @"UPDATE users SET session_start_date = (@ssd), normalized_start_time = (@nst), session_start_time = (@sst) WHERE id = (@userId);";
      cmd.Parameters.Add(new MySqlParameter("@userId", userId));
      cmd.Parameters.Add(new MySqlParameter("@ssd", sessionStartDate));
      cmd.Parameters.Add(new MySqlParameter("@nst", normalizedStartTime));
      cmd.Parameters.Add(new MySqlParameter("@sst", sessionStartTime));
      cmd.ExecuteNonQuery();

      conn.Close();
      if (conn != null)
      {
        conn.Dispose();
      }
    }
  }
}
